import {BrowserRequestAdapterMock} from '../../../../src/browser/request/adapter/mock';

describe('BrowserRequestAdapterMock', () => {
	let instance: BrowserRequestAdapterMock;

	beforeAll(() => {
		instance = new BrowserRequestAdapterMock();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestAdapterMock();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('get', () => {});

		describe('post', () => {});
	});
});
