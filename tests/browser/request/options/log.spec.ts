import {BrowserRequestOptionsLog} from '../../../../src/browser/request/options/log';

describe('BrowserRequestOptionsLog', () => {
	let instance: BrowserRequestOptionsLog;

	beforeAll(() => {
		instance = new BrowserRequestOptionsLog();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestOptionsLog();
				}).not.toThrow();
			});
		});
	});
});
