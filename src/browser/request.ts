import {BrowserRequestAdapter} from './request/adapter';
import {BrowserRequestAdapterFile} from './request/adapter/file';
import {BrowserRequestAdapterHttp} from './request/adapter/http';
import {BrowserRequestAdapterMock} from './request/adapter/mock';
import {BrowserRequestOptions} from './request/options';
import {BrowserResponse} from './response';
import {EventEmitter} from 'events';

export class BrowserRequest {
	public readonly url: string | null;
	public readonly events: EventEmitter;
	public readonly options: BrowserRequestOptions;
	public readonly adapter: BrowserRequestAdapter;

	constructor(events: EventEmitter, url: string | null, options: BrowserRequestOptions) {
		if (!events) {
			throw new Error('BrowserRequest init failed - events argument missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('BrowserRequest init failed - events argument is not an EventEmitter instance.');
		}

		if (!options) {
			throw new Error('BrowserRequest init failed - options argument missing.');
		}

		this.url = url;

		this.adapter = this.createAdapter(options.adapter.id());
		this.events = events;
		this.options = options;
	}

	public createAdapter(adapterId: string): BrowserRequestAdapter {
		switch (adapterId) {
			case 'mock':
				return new BrowserRequestAdapterMock();
			case 'https':
				return new BrowserRequestAdapterHttp();
			case 'http':
				return new BrowserRequestAdapterHttp();
			case 'file':
				return new BrowserRequestAdapterFile();
			default:
				return new BrowserRequestAdapterHttp();
		}
	}

	public async execute(method: 'GET' | 'POST' = 'GET', payload?: any): Promise<BrowserResponse> {
		const headers = this.options.headers.getAsObject();

		let result: any = null;
		switch (method) {
			case 'POST':
				result = await this.adapter.post(this.url, headers, payload);
				break;
			case 'GET':
				result = await this.adapter.get(this.url, headers);
				break;
			default:
				result = await this.adapter.get(this.url, headers);
				break;
		}

		return this.createResponse(this.events, result);
	}

	public createResponse(events: EventEmitter, res: any): BrowserResponse {
		return new BrowserResponse(events, res, this.options);
	}
}
