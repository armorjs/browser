import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';

export class BrowserResponseStatus extends StrongMap {
	public readonly status: StrongUInt;
	public readonly statusText: StrongString;

	constructor(json: any = {}) {
		super();
		this.status = makeUInt(null, 0);
		this.statusText = makeString(null, '');

		this.parse(json);
	}
}
