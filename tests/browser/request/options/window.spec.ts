import {BrowserRequestOptionsWindow} from '../../../../src/browser/request/options/window';

describe('BrowserRequestOptionsWindow', () => {
	let instance: BrowserRequestOptionsWindow;

	beforeAll(() => {
		instance = new BrowserRequestOptionsWindow();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestOptionsWindow();
				}).not.toThrow();
			});
		});
	});
});
