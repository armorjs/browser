import {BrowserRequestOptionsAdapter} from '../../../../src/browser/request/options/adapter';

describe('BrowserRequestOptionsAdapter', () => {
	let instance: BrowserRequestOptionsAdapter;

	beforeAll(() => {
		instance = new BrowserRequestOptionsAdapter();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestOptionsAdapter();
				}).not.toThrow();
			});
		});
	});
});
