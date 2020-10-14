import {StrongBoolean, StrongMap, StrongString, makeBoolean, makeString} from '@toreda/strong-types';

export class BrowserRequestOptionsLog extends StrongMap {
	public readonly enabled: StrongBoolean;

	public readonly writeToDisk: {
		enabled: StrongBoolean;
		atPath: StrongString;
	};

	constructor(json: any = {}) {
		super();
		this.enabled = makeBoolean(null, false);
		this.writeToDisk = {
			enabled: makeBoolean(null, false),
			atPath: makeString(null, '')
		};

		this.parse(json);
	}
}
