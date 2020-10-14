import {BrowserConfig} from './browser/config';
import {BrowserRequest} from './browser/request';
import {BrowserRequestOptions} from './browser/request/options';
import {BrowserResponse} from './browser/response';
import {EventEmitter} from 'events';

export class Browser {
	public readonly events: EventEmitter;
	public readonly config: BrowserConfig;

	constructor(options?: any) {
		this.events = options && options.events ? options.events : new EventEmitter();
		this.config = new BrowserConfig();
		this.config.parse(options || {});
	}

	public async load(
		url: string,
		method: 'GET' | 'POST',
		payload: any = {},
		options?: BrowserRequestOptions
	): Promise<BrowserResponse> {
		const requestOptions = options ? options : new BrowserRequestOptions();
		requestOptions.method(method);

		const request = new BrowserRequest(this.events, url, requestOptions);
		return await request.execute(method, payload);
	}

	public async get(url: string, payload?: any, options?: BrowserRequestOptions): Promise<BrowserResponse> {
		return await this.load(url, 'GET', payload, options);
	}

	public async post(url: string, payload: any, options?: BrowserRequestOptions): Promise<BrowserResponse> {
		return await this.load(url, 'POST', payload, options);
	}
}
