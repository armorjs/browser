import {Browser} from '../src/browser';
import {BrowserRequest} from '../src/browser/request';
import {BrowserRequestOptions} from '../src/browser/request/options';
import {EventEmitter} from 'events';
import Path from 'path';

const htmltests = false;

describe('Browser', () => {
	let instance: Browser;
	let events: EventEmitter;

	beforeAll(() => {
		events = new EventEmitter();
		instance = new Browser({events: events});
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw when events argument is omitted', () => {
				expect(() => {
					new Browser();
				}).not.toThrow();
			});

			it('should create a new event emitter when events argument is omitted', () => {
				const custom = new Browser();
				expect(custom.events instanceof EventEmitter).toBe(true);
			});

			it('should use options.events when given', () => {
				const custom = new Browser({events: events});
				expect(custom.events).toBe(events);
			});
		});
	});

	describe('Implementation', () => {
		let spy: jest.SpyInstance;
		let url = 'testurl';
		let options = {test: 'options'};

		beforeAll(() => {
			spy = jest.spyOn(instance, 'load');
		});

		afterEach(() => {
			spy.mockClear();
		});

		afterAll(() => {
			spy.mockRestore();
		});

		describe('get', () => {
			it('should call load with get', () => {
				spy.mockImplementationOnce(() => {});

				instance.get(url, {}, options as any);

				expect(spy).toBeCalledWith(url, 'GET', {}, options);
			});
		});

		describe('post', () => {
			it('should call load with post', () => {
				spy.mockImplementationOnce(() => {});

				instance.post(url, {}, options as any);

				expect(spy).toBeCalledWith(url, 'POST', {}, options);
			});
		});

		describe('load', () => {
			let spy: jest.SpyInstance;

			beforeAll(() => {
				spy = jest.spyOn(BrowserRequest.prototype, 'execute').mockReturnValue('execute ran' as any);
			});

			afterAll(() => {
				spy.mockRestore();
			});

			it('should create a Browserrequest and execute if options is missing', () => {
				const result = instance.load(url, 'GET');
				return expect(result).resolves.toBe('execute ran');
			});

			it('should create a Browserrequest and execute if options is given', () => {
				const result = instance.load(url, 'GET', {}, new BrowserRequestOptions());
				return expect(result).resolves.toBe('execute ran');
			});

			it('should always return BrowserResponse', () => {
				const result = instance.load(undefined as any, undefined as any, undefined as any, undefined as any);
				return expect(result).resolves.toBe('execute ran');
			});
		});
	});

	describe('Overall API Usage', () => {
		let requestOptions: BrowserRequestOptions;

		beforeAll(() => {
			requestOptions = new BrowserRequestOptions();
			requestOptions.adapter.id('file');
		});

		it('Interact With Relative Anchor Links', () => {
			const path = Path.resolve('sample-data/anchor-link.html');
			return new Browser()
				.get(path, null, requestOptions)
				.then((rsp) => {
					return rsp.followLink('#linkRel');
				})
				.then((rsp) => {
					expect(rsp.win.title()).toBe('hello');
				})
				.catch((err) => {
					console.error(`Error: ${err}`);
					expect(false).toBe(true);
				});
		});

		if (htmltests) {
			it('Interact With Absolute Anchor Links', () => {
				const path = Path.resolve('sample-data/anchor-link.html');
				return new Browser()
					.get(path, null, requestOptions)
					.then((rsp) => {
						return rsp.followLink('#linkAbs');
					})
					.then((rsp) => {
						expect(rsp.win.title()).toBe('GitHub - armorjs/headless');
					})
					.catch((err) => {
						console.error(`Error: ${err}`);
						expect(false).toBe(true);
					});
			}, 10000);

			it('Interact With GET Form', async () => {
				const path = 'https://www.w3schools.com/howto/tryhow_css_contact_section.htm';
				await new Browser()
					.get(path)
					.then((rsp) => {
						const fname = rsp.getElement('#fname');
						const lname = rsp.getElement('#lname');
						const country = rsp.getElement('#country');

						if (!fname || !lname || !country) {
							throw '';
						}

						(fname.element as HTMLInputElement).value = 'Custom';
						(lname.element as HTMLInputElement).value = 'Person';
						(country.element as HTMLSelectElement).value = 'usa';

						return rsp.submitForm('*[type=submit]');
					})
					.then((rsp) => {
						const result = rsp.getElement('h2 + div');
						expect(result!.text()).toContain('firstname=Custom&lastname=Person&country=usa');
					})
					.catch((err) => {
						console.error(`Error: ${err}`);
						expect(err).toBe(undefined);
					});
			}, 10000);

			it('Interact With POST Form', () => {
				const path = 'https://www.w3schools.com/howto/tryhow_css_login_form_modal.htm';
				return new Browser()
					.get(path)
					.then((rsp) => {
						rsp.click('button');
						const formIuname = rsp.getElement('input[name=uname]');
						const formIpsw = rsp.getElement('input[name=psw]');
						const formIremember = rsp.getElement('input[name=remember]');

						if (!formIuname || !formIpsw || !formIremember) {
							throw '';
						}

						(formIuname.element as HTMLInputElement).value = 'CustomUserName';
						(formIpsw.element as HTMLInputElement).value = 'CustomPassWord';
						(formIremember.element as HTMLInputElement).checked = true;

						return rsp.submitForm('*[type=submit]');
					})
					.then((rsp) => {
						const result = rsp.getElement('h2 + div');
						expect(result!.text()).toContain('uname=CustomUserName&psw=CustomPassWord&remember=on');
					})
					.catch((err) => {
						console.error(`Error: ${err}`);
						expect(err).toBe(undefined);
					});
			}, 10000);
		}
	});
});
