import {StrongBoolean, StrongMap, makeBoolean} from '@toreda/strong-types';

export class BrowserRequestOptionsWindow extends StrongMap {
	public readonly executeJavascript: StrongBoolean;
	public readonly loadResources: StrongBoolean;

	constructor(json: any = {}) {
		super();
		this.executeJavascript = makeBoolean(null, false);
		this.loadResources = makeBoolean(null, true);

		this.parse(json);
	}
}
