import {BrowserRequestOptions} from '../../../src/browser/request/options';
import {BrowserRequestOptionsAdapter} from '../../../src/browser/request/options/adapter';
import {BrowserRequestOptionsHeaders} from '../../../src/browser/request/options/headers';
import {BrowserRequestOptionsLog} from '../../../src/browser/request/options/log';
import {BrowserRequestOptionsWindow} from '../../../src/browser/request/options/window';

describe('BrowserRequestOptions', () => {
	let instance: BrowserRequestOptions;

	beforeAll(() => {
		instance = new BrowserRequestOptions();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestOptions();
				}).not.toThrow();
			});
			it('should set properties', () => {
				expect(instance.adapter).toBeInstanceOf(BrowserRequestOptionsAdapter);
				expect(instance.headers).toBeInstanceOf(BrowserRequestOptionsHeaders);
				expect(instance.log).toBeInstanceOf(BrowserRequestOptionsLog);
				expect(instance.window).toBeInstanceOf(BrowserRequestOptionsWindow);
			});
		});
	});
});
