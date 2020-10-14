import {BrowserRequestAdapter} from '../adapter';
import {BrowserRequestHeaders} from '../headers';

export class BrowserRequestAdapterMock implements BrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'mock';
	}

	public get(url: string | null, headers: BrowserRequestHeaders): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve({});
		});
	}

	public post(url: string | null, headers: BrowserRequestHeaders, payload: any): Promise<any> {
		return new Promise((resolve, reject) => {
			return resolve({});
		});
	}
}
