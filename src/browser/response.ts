import {StrongString, makeString} from '@toreda/strong-types';

import {Browser} from '../browser';
import {BrowserRequestOptions} from './request/options';
import {BrowserRequestOptionsWindow} from './request/options/window';
import {BrowserResponseNode} from './response/node';
import {BrowserResponseStatus} from './response/status';
import {BrowserResponseWindow} from './response/window';
import {EventEmitter} from 'events';
import Path from 'path';

export class BrowserResponse {
	public readonly events: EventEmitter;
	public readonly res: any;
	public readonly status: BrowserResponseStatus;
	public readonly url: StrongString;
	public readonly origin: StrongString;
	public readonly options: BrowserRequestOptions;
	public win: BrowserResponseWindow;
	public loaded: boolean;

	constructor(events: EventEmitter, res: any, options: BrowserRequestOptions) {
		if (!events) {
			throw new Error('BrowserResponse init failed - request.events property missing.');
		}

		if (!(events instanceof EventEmitter)) {
			throw new Error('BrowserResponse init failed - request.event property is not an EventEmitter instance.');
		}

		this.loaded = false;
		this.options = options;
		this.res = res ? res : null;
		this.url = this.createUrl(res);
		this.origin = this.createOrigin(this.url());
		this.status = new BrowserResponseStatus(res);
		this.events = events;

		try {
			this.win = this.load();
		} catch (error) {
			throw Error(`BrowserResponse init failed - ${error.message}`);
		}
	}

	public createUrl(res: any): StrongString {
		const url = makeString(null, '');

		if (this.options.adapter.id() === 'file') {
			url(Path.resolve(res.url));
			return url;
		}

		if (res && res.config) {
			url(res.config.url);
		}

		return url;
	}

	public createOrigin(url: string): StrongString {
		const origin = makeString(null, '');

		if (this.options.adapter.id() === 'file') {
			origin(url.replace(this.res.url, ''));
			return origin;
		}

		if (url) {
			origin(new URL(url).origin);
		}

		return origin;
	}

	public load(): BrowserResponseWindow {
		if (this.loaded) {
			return this.win;
		}

		return this.createAndLoadWindow(this.options.window);
	}

	public createAndLoadWindow(options?: BrowserRequestOptionsWindow): BrowserResponseWindow {
		let win: BrowserResponseWindow;

		try {
			win = new BrowserResponseWindow(this.events, this.res, options || this.options.window);
		} catch (error) {
			throw Error(`BrowserResponse createAndLoadWindow failed - ${error.message}`);
		}

		this.loaded = true;

		return win;
	}

	public handleFormElement(element: any): string {
		if (!element?.name) {
			return '';
		}

		if (element.nodeName === 'TEXTAREA') {
			return element.textContent || '';
		}

		if (element.nodeName === 'SELECT') {
			return element.value || '';
		}

		if (element.nodeName !== 'INPUT') {
			return '';
		}

		if (element.type === 'checkbox') {
			return element.checked ? element.value || 'on' : '';
		}

		return element.value || '';
	}

	public getBody(): BrowserResponseNode {
		const element = this.win.element('body');

		if (!element) {
			throw Error('BrowserResponse getBody failed - no body element');
		}

		return element;
	}

	public getElement(selector: string): BrowserResponseNode | null {
		if (!this.loaded) {
			return null;
		}

		if (!this.win) {
			return null;
		}

		const element = this.win.element(selector);

		if (!element) {
			return null;
		}

		return element;
	}

	public click(selector: string): boolean {
		if (!this.loaded) {
			return false;
		}

		if (!this.win) {
			return false;
		}

		const node = this.getElement(selector);

		if (!node) {
			return false;
		}

		node.click();
		return true;
	}

	public async followLink(selector: string): Promise<BrowserResponse> {
		const node = this.getElement(selector);

		if (!node || node.element.nodeName !== 'A') {
			throw Error('BrowserResponse followLink failed - no anchor link found.');
		}

		const link: HTMLAnchorElement = node.element as HTMLAnchorElement;

		const origin = this.origin();
		const hrefLiteral = link.getAttribute('href');
		const hrefResolve = link.href;

		let url: string;

		if (hrefLiteral === hrefResolve) {
			url = hrefLiteral;
			let protocol = hrefLiteral.split(':')[0];
			this.options.adapter.id(protocol);
		} else {
			url = origin + hrefLiteral;
		}

		const browser = new Browser({events: this.events});
		return browser.get(url, null, this.options);
	}

	public async submitForm(selector: string): Promise<BrowserResponse> {
		const node = this.getElement(selector);

		if (!node || (node.element as HTMLInputElement).type !== 'submit') {
			throw Error('BrowserResponse submitForm failed - no submit button found.');
		}

		const submit: HTMLInputElement = node.element as HTMLInputElement;
		const form = submit.form;

		if (!form) {
			throw Error('BrowserResponse submitForm failed - no form found.');
		}

		const method = form.method.toLowerCase();
		const action = new URL(form.action).pathname;
		const origin = this.origin();
		let url = origin + action;

		let search = [].filter
			.call(form.elements, (elm: any) => {
				return !!elm.name;
			})
			.map((elm: any) => {
				return `${elm.name}=${this.handleFormElement(elm)}`;
			})
			.join('&');

		if (method === 'get') {
			url += `?${search}`;
		}

		const browser = new Browser({events: this.events});

		return browser.load(url, method === 'post' ? 'POST' : 'GET', search, this.options);
	}
}
