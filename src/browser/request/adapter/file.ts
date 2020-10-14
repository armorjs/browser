import {BrowserRequestAdapter} from '../adapter';
import {BrowserRequestHeaders} from '../headers';
import fs from 'fs';

export class BrowserRequestAdapterFile implements BrowserRequestAdapter {
	public readonly id: string;

	constructor() {
		this.id = 'file';
	}

	public getFile(path: string | null): Promise<any | null> {
		return new Promise((resolve, reject) => {
			if (typeof path !== 'string') {
				return reject(new Error('BrowserRequestAdapterFile failed - path is not a string.'));
			}

			let data = '';
			const stream = fs.createReadStream(path, {encoding: 'utf8'});
			stream.on('data', (chunk: any) => {
				data += chunk;
			});

			stream.on('close', () => {
				return resolve({
					data: data,
					url: path
				});
			});

			stream.on('error', (e) => {
				return reject(e);
			});
		});
	}

	public async get(path: string | null, headers: BrowserRequestHeaders): Promise<any> {
		return await this.getFile(path);
	}

	public async post(path: string | null, headers: BrowserRequestHeaders, payload: any): Promise<any> {
		return await this.getFile(path);
	}
}
