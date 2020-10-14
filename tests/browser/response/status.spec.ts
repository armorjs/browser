import {BrowserResponseStatus} from '../../../src/browser/response/status';

describe('BrowserResponseStatus', () => {
	let instance: BrowserResponseStatus;

	beforeAll(() => {
		instance = new BrowserResponseStatus({});
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserResponseStatus();
				}).not.toThrow();
			});

			it('should set props using res', () => {
				let expectedV = {
					status: 1,
					statusText: 'okay'
				};

				let result = new BrowserResponseStatus(expectedV);

				expect(result.status()).toBe(expectedV.status);
				expect(result.statusText()).toBe(expectedV.statusText);
			});
		});
	});
});
