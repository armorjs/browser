import {StrongMap} from '@toreda/strong-types';

export class BrowserConfigGeneral extends StrongMap {
	constructor(json: any = {}) {
		super();

		this.parse(json);
	}
}
