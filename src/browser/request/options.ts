import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';

import {BrowserRequestOptionsAdapter} from './options/adapter';
import {BrowserRequestOptionsHeaders} from './options/headers';
import {BrowserRequestOptionsLog} from './options/log';
import {BrowserRequestOptionsWindow} from './options/window';

export class BrowserRequestOptions extends StrongMap {
	public readonly window: BrowserRequestOptionsWindow;
	public readonly log: BrowserRequestOptionsLog;
	public readonly headers: BrowserRequestOptionsHeaders;
	public readonly method: StrongString;
	public readonly adapter: BrowserRequestOptionsAdapter;
	public readonly timeout: StrongUInt;

	constructor(json: any = {}) {
		super();
		this.adapter = new BrowserRequestOptionsAdapter();
		this.headers = new BrowserRequestOptionsHeaders();
		this.log = new BrowserRequestOptionsLog();
		this.window = new BrowserRequestOptionsWindow();
		this.method = makeString(null, 'get');
		this.timeout = makeUInt(null, 10000);

		this.parse(json);
	}
}
