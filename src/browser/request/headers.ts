export interface BrowserRequestHeaders {
	Origin: string;
	Host: string;
	'User-Agent': string;
	'X-Requested-With': string;
	'X-MicrosoftAjax': string;
	AcceptsCookies: string;
	Pragma: string;
	'Cache-Control': string;
	'Sec-Fetch-Mode': string;
	'Sec-Fetch-Site': string;
	DNT: number;
	Accept: string;
	'Accept-Language': string;
	'Accept-Encoding': string;
	'Content-Type'?: string;
	Referer?: string;
	Cookie?: string;
	'Sec-Fetch-User'?: string;
	method?: string;
	'Upgrade-Insecure-Requests'?: string;
}
