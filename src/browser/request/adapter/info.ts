export class BrowserRequestAdapterInfo {
	public readonly id: string;
	public readonly filePath: string;
	public loadedClass: any;

	constructor(id: string, filePath: string) {
		this.id = id;
		this.filePath = filePath;
	}

	public async load(): Promise<any> {
		this.loadedClass = await import(this.filePath);
	}
}
