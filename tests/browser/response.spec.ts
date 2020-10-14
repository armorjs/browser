import {BrowserRequestOptions} from '../../src/browser/request/options';
import {BrowserResponse} from '../../src/browser/response';
import {BrowserResponseNode} from '../../src/browser/response/node';
import {BrowserResponseWindow} from '../../src/browser/response/window';
import {EventEmitter} from 'events';

describe('BrowserResponse', () => {
	let instance: BrowserResponse;
	let events: EventEmitter;
	let emptyRes: any;
	let options: BrowserRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		emptyRes = {};
		options = new BrowserRequestOptions();
		instance = new BrowserResponse(events, emptyRes, options);
		instance.load();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should throw when events argument is missing', () => {
				expect(() => {
					new BrowserResponse(undefined as any, emptyRes, options);
				}).toThrow('BrowserResponse init failed - request.events property missing.');
			});

			it('should throw when events argument is not an EventEmitter instance', () => {
				expect(() => {
					new BrowserResponse({} as any, emptyRes, options);
				}).toThrow('BrowserResponse init failed - request.event property is not an EventEmitter instance.');
			});

			it('should throw when load fails', () => {
				expect(() => {
					new BrowserResponse(events, undefined as any, options);
				}).toThrow(/BrowserResponse init failed - BrowserResponse/);
			});

			it('should initialize events property from the events argument', () => {
				const events12 = new EventEmitter();
				const custom = new BrowserResponse(events12, emptyRes, options);
				expect(custom.events).toBe(events12);
				expect(custom.events).not.toBe(events);
			});

			it('should initialize res property from the res argument', () => {
				const res = {
					one: '14414141',
					two: '44091091'
				} as any;
				const custom = new BrowserResponse(events, res, options);
				expect(custom.res).toEqual(res);
			});

			it('should initialize win property', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				expect(custom.win).not.toBeUndefined();
			});
		});
	});

	describe('Implementation', () => {
		describe('createUrl', () => {
			it('should return a StrongString holding res data', () => {
				const expectedV = 'test create url string';
				const result = instance.createUrl({config: {url: expectedV}});
				expect(result.typeId).toBe('StrongType');
				expect(result()).toBe(expectedV);
			});

			it('should return default StrongString if res is not the right format', () => {
				const expectedV = 'fallback';
				expect(instance.createUrl('not valid format').get(expectedV)).toBe(expectedV);
				expect(instance.createUrl({config: 'not valid format'}).get(expectedV)).toBe(expectedV);
			});
		});

		describe('load', () => {
			it('should return win if it has already been loaded', () => {
				expect(instance.loaded).toBe(true);
				const expectedV = instance.win;
				expect(instance.load()).toBe(expectedV);
			});

			it('should return window object', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				custom.loaded = false;
				expect(custom.load()).toBeInstanceOf(BrowserResponseWindow);
			});

			it('should throw when createAndLoadWindow throws', () => {
				let spy = jest.spyOn(BrowserResponse.prototype, 'createAndLoadWindow');
				spy.mockReturnValueOnce({} as any);
				const custom = new BrowserResponse(events, undefined as any, options);
				spy.mockRestore();

				expect(custom.loaded).toBe(false);

				expect(() => {
					custom.load();
				}).toThrow(/BrowserResponse createAndLoadWindow failed - BrowserResponseWindow/);
			});
		});

		describe('createAndLoadWindow', () => {
			it('should return an BrowserResponseWindow instance', () => {
				const win = instance.createAndLoadWindow();
				expect(win).not.toBeNull();
				expect(win instanceof BrowserResponseWindow).toBe(true);
			});

			it('should throw when window init throws', () => {
				let spy = jest.spyOn(BrowserResponse.prototype, 'createAndLoadWindow');
				spy.mockReturnValueOnce({} as any);
				const custom = new BrowserResponse(events, undefined as any, options);
				spy.mockRestore();

				expect(() => {
					custom.createAndLoadWindow();
				}).toThrow(/BrowserResponse createAndLoadWindow failed - BrowserResponseWindow/);
			});
		});

		describe('getBody', () => {
			it('should return null if no body element exists', () => {
				const body = instance.getBody()!;
				expect(body).not.toBeNull();

				const parent = body.element.parentNode!;
				parent.removeChild(body.element);
				expect(() => {
					instance.getBody();
				}).toThrow('BrowserResponse getBody failed - no body element');

				parent.appendChild(body.element);
			});

			it('should return BrowserResponseNode of document body', () => {
				expect(instance.getBody()).toBeInstanceOf(BrowserResponseNode);
			});
		});

		describe('getElement', () => {
			let badSelector = 'something';
			let goodSelector = '*';

			it('should return null if not finished loading', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				custom.loaded = false;
				expect(custom.getElement(badSelector)).toBeNull();
			});

			it('should return null if win does not exist', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				expect(custom.loaded).toBe(true);
				delete custom.win;
				expect(custom.getElement(badSelector)).toBeNull();
			});

			it('should return null if no element is found', () => {
				expect(instance.loaded).toBe(true);
				expect(instance.win).toBeTruthy();
				expect(instance.getElement(badSelector)).toBeNull();
			});

			it('should return BrowserReponseElement if element is found', () => {
				expect(instance.loaded).toBe(true);
				expect(instance.win).not.toBeNull();

				expect.assertions(3);

				expect(instance.getElement(goodSelector)).toBeInstanceOf(BrowserResponseNode);
			});
		});

		describe('click', () => {
			let badSelector = 'something';
			let goodSelector = '*';

			it('should return error if not finished loading', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				custom.loaded = false;
				expect(custom.click(goodSelector)).toBe(false);
			});

			it('should return error if win does not exist', () => {
				const custom = new BrowserResponse(events, emptyRes, options);
				expect(custom.loaded).toBe(true);
				delete custom.win;
				expect(custom.click(goodSelector)).toBe(false);
			});

			it('should return error if no element is found', () => {
				expect(instance.loaded).toBe(true);
				expect(instance.win).toBeTruthy();
				expect(instance.click(badSelector)).toBe(false);
			});

			it('should return true if element is clicked', () => {
				expect(instance.loaded).toBe(true);
				expect(instance.win).toBeTruthy();
				expect(instance.click(goodSelector)).toBe(true);
			});
		});

		describe('followLink', () => {
			it('should throw if query does not return an anchor', () => {
				return expect(instance.followLink('*:not(a)')).rejects.toThrow(
					/BrowserResponse followLink failed - no anchor link found/
				);
			});
		});

		describe('submitForm', () => {
			it('should throw if query does not return a submit', () => {
				return expect(instance.submitForm('*[type!=submit]')).rejects.toThrow(
					/BrowserResponse submitForm failed - no submit button found/
				);
			});

			it('should throw if the submit does not have a form', () => {
				const custom = new BrowserResponse(events, {data: `<input type='submit'/>`}, options);

				return expect(custom.submitForm('*[type=submit]')).rejects.toThrow(
					/BrowserResponse submitForm failed - no form found/
				);
			});
		});

		describe('handleFormElement', () => {
			it('should return an empty string when element has no name', () => {
				expect(instance.handleFormElement(null)).toBe('');
				expect(instance.handleFormElement(instance.getBody())).toBe('');
			});

			it('should return the textContent of a textarea', () => {
				let expectedV = '';
				const formData = instance.win.doc.createElement('textarea');
				formData.name = 'testForm';
				expect(instance.handleFormElement(formData)).toBe(expectedV);

				expectedV = 'testing value 398';
				formData.textContent = expectedV;
				expect(instance.handleFormElement(formData)).toBe(expectedV);
			});

			it('should return the value of a select', () => {
				let expectedV = '';
				const formData = instance.win.doc.createElement('select');
				const option = formData.appendChild(instance.win.doc.createElement('option'));
				formData.name = 'testForm';
				option.selected;
				expect(instance.handleFormElement(formData)).toBe(expectedV);

				expectedV = 'testing value 908';
				option.value = expectedV;
				expect(instance.handleFormElement(formData)).toBe(expectedV);
			});

			it('should return the value of an input', () => {
				let expectedV = '';
				const formData = instance.win.doc.createElement('input');
				formData.name = 'testForm';
				expect(instance.handleFormElement(formData)).toBe(expectedV);

				expectedV = 'testing value 824';
				formData.value = expectedV;
				expect(instance.handleFormElement(formData)).toBe(expectedV);
			});

			it('should return the value of a checkbox', () => {
				let expectedV = '';
				const formData = instance.win.doc.createElement('input');
				formData.type = 'checkbox';
				formData.name = 'testForm';
				formData.checked = false;
				expect(instance.handleFormElement(formData)).toBe(expectedV);

				expectedV = 'on';
				formData.checked = true;
				expect(instance.handleFormElement(formData)).toBe(expectedV);

				expectedV = 'testing value 281';
				formData.value = expectedV;
				expect(instance.handleFormElement(formData)).toBe(expectedV);
			});

			it('should return an empty string if it is not a form element', () => {
				let expectedV = '';
				const formData = instance.win.doc.createElement('div') as any;
				formData.name = 'testForm';
				formData.textContent = 'testing value 635';
				expect(instance.handleFormElement(formData)).toBe(expectedV);
			});
		});
	});
});
