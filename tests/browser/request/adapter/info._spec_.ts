import {BrowserRequestAdapterInfo} from '../../../../src/browser/request/adapter/info';

describe('BrowserRequestAdapterInfo', () => {
	let instance: BrowserRequestAdapterInfo;

	beforeAll(() => {
		const id = 'BrowserRAI';
		const filePath = './';

		instance = new BrowserRequestAdapterInfo(id, filePath);
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestAdapterInfo('', '');
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('load', () => {});
	});
});
