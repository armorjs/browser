import {BrowserRequestOptionsHeaders} from '../../../../src/browser/request/options/headers';

describe('BrowserRequestOptionsHeaders', () => {
	let instance: BrowserRequestOptionsHeaders;

	beforeAll(() => {
		instance = new BrowserRequestOptionsHeaders();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestOptionsHeaders();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('getAsObject', () => {
			it('should have all listed keys and only these keys', () => {
				const expectedV = [
					'Accept',
					'AcceptsCookies',
					'Accept-Encoding',
					'Accept-Language',
					'Cache-Control',
					'Pragma',
					'Origin',
					'Host',
					'DNT',
					'Sec-Fetch-Mode',
					'Sec-Fetch-Site',
					'User-Agent',
					'X-Requested-With',
					'X-MicrosoftAjax'
				];

				expect(Object.keys(instance.getAsObject())).toStrictEqual(expectedV);
			});
		});
	});
});
