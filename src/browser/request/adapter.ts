import {BrowserRequestHeaders} from './headers';

export interface BrowserRequestAdapter {
	id: string;
	get(url: string | null, headers: BrowserRequestHeaders): Promise<any>;
	post(url: string | null, headers: BrowserRequestHeaders, payload: any): Promise<any>;
}
