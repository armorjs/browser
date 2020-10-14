import {BrowserConfigGeneral} from './config/general';
import {StrongMap} from '@toreda/strong-types';

export class BrowserConfig extends StrongMap {
	public readonly general: BrowserConfigGeneral;

	constructor(json: any = {}) {
		super();
		this.general = new BrowserConfigGeneral();

		this.parse(json);
	}
}
