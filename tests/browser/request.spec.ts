import {BrowserRequest} from '../../src/browser/request';
import {BrowserRequestAdapterFile} from '../../src/browser/request/adapter/file';
import {BrowserRequestAdapterHttp} from '../../src/browser/request/adapter/http';
import {BrowserRequestAdapterMock} from '../../src/browser/request/adapter/mock';
import {BrowserRequestOptions} from '../../src/browser/request/options';
import {BrowserResponse} from '../../src/browser/response';
import {EventEmitter} from 'events';

const MOCK_URL = 'https://www.w3schools.com/howto/tryhow_make_a_website_ifr.htm';

describe('BrowserRequest', () => {
	let instance: BrowserRequest;
	let events: EventEmitter;
	let options: BrowserRequestOptions;

	beforeAll(() => {
		events = new EventEmitter();
		options = new BrowserRequestOptions();
		options.adapter.id('mock');
		instance = new BrowserRequest(events, MOCK_URL, options);
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should throw when events argument is missing', () => {
				expect(() => {
					new BrowserRequest(undefined as any, '', options);
				}).toThrow('BrowserRequest init failed - events argument missing.');
			});

			it('should throw when events argument is not an EventEmitter instance', () => {
				expect(() => {
					new BrowserRequest({} as any, '', options);
				}).toThrow('BrowserRequest init failed - events argument is not an EventEmitter instance.');
			});

			it('should throw when events argument is not an EventEmitter instance', () => {
				expect(() => {
					new BrowserRequest(events, '', null!);
				}).toThrow('BrowserRequest init failed - options argument missing.');
			});
		});
	});

	describe('Implementation', () => {
		describe('createAdapter', () => {
			it('should return a mock adapter instance when adapterId argument is mock', () => {
				const result = instance.createAdapter('mock');
				expect(result instanceof BrowserRequestAdapterMock).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is http', () => {
				const result = instance.createAdapter('http');
				expect(result instanceof BrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is https', () => {
				const result = instance.createAdapter('https');
				expect(result instanceof BrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a file adapter instance when adapterId argument is file', () => {
				const result = instance.createAdapter('file');
				expect(result instanceof BrowserRequestAdapterFile).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not provided', () => {
				const result = instance.createAdapter(undefined as any);
				expect(result instanceof BrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is an empty string', () => {
				const result = instance.createAdapter('');
				expect(result instanceof BrowserRequestAdapterHttp).toBe(true);
			});

			it('should return a http adapter instance when adapterId argument is not a supported adapterId', () => {
				const result = instance.createAdapter('@@@@@@');
				expect(result instanceof BrowserRequestAdapterHttp).toBe(true);
			});
		});

		describe('execute', () => {
			let spyGet: jest.SpyInstance;
			let spyPost: jest.SpyInstance;

			beforeAll(() => {
				spyGet = jest.spyOn(instance.adapter, 'get');
				spyPost = jest.spyOn(instance.adapter, 'post');
			});

			beforeEach(() => {
				spyGet.mockClear();
				spyPost.mockClear();
			});

			it('should use get() when no method is given', () => {
				instance.execute();
				expect(spyGet).toBeCalledTimes(1);
				expect(spyPost).toBeCalledTimes(0);
			});

			it('should use get() when method is GET', () => {
				instance.execute('GET');
				expect(spyGet).toBeCalledTimes(1);
				expect(spyPost).toBeCalledTimes(0);
			});

			it('should use post() when method is POST', () => {
				instance.execute('POST');
				expect(spyGet).toBeCalledTimes(0);
				expect(spyPost).toBeCalledTimes(1);
			});

			it('should use get() when method is given not GET or POST', () => {
				instance.execute('something else' as any);
				expect(spyGet).toBeCalledTimes(1);
				expect(spyPost).toBeCalledTimes(0);
			});

			it('should return BrowserResponse', async (done) => {
				const result = await instance.execute();
				expect(result).toBeInstanceOf(BrowserResponse);
				done();
			});
		});

		describe('createResponse', () => {
			it('should return an BrowserResponse', () => {
				const result = instance.createResponse(events, {});
				expect(result).toBeInstanceOf(BrowserResponse);
			});
		});
	});
});
