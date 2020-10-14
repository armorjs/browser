export class BrowserResponseNode {
	public readonly document: HTMLDocument;
	public readonly element: HTMLElement;

	constructor(document: any, element: HTMLElement) {
		if (!document) {
			throw new Error('BrowserResponseNode init failed - must provide document argument.');
		}

		if (!element) {
			throw new Error('BrowserResponseNode init failed - must provide element argument.');
		}

		this.document = document;
		this.element = element;
	}

	public child(selector: string): BrowserResponseNode | null {
		let result: HTMLElement | null;

		try {
			result = this.element.querySelector(selector);
		} catch (e) {
			result = null;
		}

		if (!result) {
			return null;
		}

		return new BrowserResponseNode(this.document, result);
	}

	public childCount(): number {
		return this.element.childElementCount;
	}

	public click(): void {
		this.element.click();
	}

	public html(): string | null {
		return this.element.innerHTML;
	}

	public text(): string | null {
		let text = this.element.textContent;

		if (!text) {
			return '';
		}

		return text.trim();
	}
}
