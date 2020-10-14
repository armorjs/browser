import {StrongBoolean, StrongMap, StrongString, makeBoolean, makeString} from '@toreda/strong-types';

export class BrowserRequestOptionsAdapter extends StrongMap {
	public readonly id: StrongString;
	public readonly httpFallback: {
		enabled: StrongBoolean;
	};

	constructor(json: any = {}) {
		super();
		this.id = makeString(null, 'http');
		this.httpFallback = {
			enabled: makeBoolean(null, true)
		};

		this.parse(json);
	}
}
