import {StrongMap, StrongString, StrongUInt, makeString, makeUInt} from '@toreda/strong-types';

import {BrowserRequestHeaders} from '../headers';

export class BrowserRequestOptionsHeaders extends StrongMap {
	public readonly origin: StrongString;
	public readonly host: StrongString;
	public readonly accept: StrongString;
	public readonly acceptLanguage: StrongString;
	public readonly acceptEncoding: StrongString;
	public readonly acceptsCookies: StrongString;
	public readonly cacheControl: StrongString;
	public readonly cookie: StrongString;
	public readonly contentControl: StrongString;
	public readonly dnt: StrongUInt;
	public readonly method: StrongString;
	public readonly pragma: StrongString;
	public readonly referer: StrongString;
	public readonly secFetchMode: StrongString;
	public readonly secFetchSite: StrongString;
	public readonly secFetchUser: StrongString;
	public readonly upgradeInsecureRequests: StrongString;
	public readonly userAgent: StrongString;
	public readonly xRequestedWith: StrongString;
	public readonly xMicrosoftAjax: StrongString;

	constructor(json: any = {}) {
		super();
		this.accept = makeString(null, '*/*');
		this.acceptEncoding = makeString(null, 'gzip, deflare, br');
		this.acceptLanguage = makeString(null, 'en-US,en;q=0.9');
		this.acceptsCookies = makeString(null, 'yes');
		this.cacheControl = makeString(null, 'no-cache');
		this.cookie = makeString(null, '');
		this.contentControl = makeString(null, '');
		this.dnt = makeUInt(null, 1);
		this.method = makeString(null, 'GET');
		this.host = makeString(null, '');
		this.pragma = makeString(null, 'no-cache');
		this.origin = makeString(null, '');
		this.referer = makeString(null, '');
		this.secFetchMode = makeString(null, 'cors');
		this.secFetchSite = makeString(null, 'same-origin');
		this.secFetchUser = makeString(null, '');
		this.upgradeInsecureRequests = makeString(null, '');
		this.userAgent = makeString(null, '');
		this.xRequestedWith = makeString(null, 'XMLHttpRequest');
		this.xMicrosoftAjax = makeString(null, 'Delta=true');

		this.parse(json);
	}

	public getAsObject(): BrowserRequestHeaders {
		return {
			Accept: this.accept(),
			AcceptsCookies: this.acceptsCookies(),
			'Accept-Encoding': this.acceptEncoding(),
			'Accept-Language': this.acceptLanguage(),
			'Cache-Control': this.cacheControl(),
			Pragma: this.pragma(),
			Origin: this.origin(),
			Host: this.host(),
			DNT: this.dnt(),
			'Sec-Fetch-Mode': this.secFetchMode(),
			'Sec-Fetch-Site': this.secFetchSite(),
			'User-Agent': this.userAgent(),
			'X-Requested-With': this.xRequestedWith(),
			'X-MicrosoftAjax': this.xMicrosoftAjax()
		};
	}
}
