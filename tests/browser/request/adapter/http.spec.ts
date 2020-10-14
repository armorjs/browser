import {BrowserRequestAdapterHttp} from '../../../../src/browser/request/adapter/http';
import axios from 'axios';
import {mocked} from 'ts-jest/utils';

jest.mock('axios');

describe('BrowserRequestAdapterHttp', () => {
	let instance: BrowserRequestAdapterHttp;

	beforeAll(() => {
		instance = new BrowserRequestAdapterHttp();
	});

	beforeEach(() => {
		mocked(axios).mockClear();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestAdapterHttp();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe.each(['get', 'post'])('%s', (type) => {
			it('should reject and return null if url is not a string', async () => {
				const expectedV = `BrowserRequestAdapterHttp ${type} failed - url is not a string.`;
				await expect(instance[type](null, {} as any, {})).rejects.toThrow(expectedV);
			});

			it('should reject and return null if url is not a string', async () => {
				const errorMessage = 'network error';

				mocked(axios[type]).mockImplementationOnce(() => {
					return Promise.reject(new Error(errorMessage));
				});

				await expect(instance[type]('', {} as any, {})).rejects.toThrow(errorMessage);
			});

			it('should resolve and return data', async () => {
				const path = 'http://google.com';
				const expectedV = {
					data: 'some data'
				};

				mocked(axios[type]).mockImplementationOnce(() => {
					return Promise.resolve(expectedV);
				});

				await expect(instance[type](path, {} as any, {})).resolves.toEqual(expectedV);
			});
		});
	});
});
