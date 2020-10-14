import {BrowserRequestAdapterFile} from '../../../../src/browser/request/adapter/file';
import Path from 'path';

describe('BrowserRequestAdapterFile', () => {
	let instance: BrowserRequestAdapterFile;

	beforeAll(() => {
		instance = new BrowserRequestAdapterFile();
	});

	describe('Constructors', () => {
		describe('constructor', () => {
			it('should not throw', () => {
				expect(() => {
					new BrowserRequestAdapterFile();
				}).not.toThrow();
			});
		});
	});

	describe('Implementation', () => {
		describe('getFile', () => {
			it('should reject if path is not a string', async () => {
				const expectedV = new Error('BrowserRequestAdapterFile failed - path is not a string.');
				await expect(instance.getFile(null)).rejects.toThrow(expectedV);
			});

			it('should reject and report if an error occurs', async () => {
				await expect(instance.getFile('')).rejects.toThrow();
			});

			it('should resolve and return data', async () => {
				const path = Path.resolve('sample-data/testfile.txt');
				const expectedV = {data: 'This file has some data.', url: path};
				await expect(instance.getFile(path)).resolves.toEqual(expectedV);
			});
		});

		describe('get', () => {
			it('should call getFile with path arg', () => {
				const spy = jest.spyOn(instance, 'getFile').mockImplementationOnce((): any => {});

				const expectedV = 'testpathnamepost';
				instance.get(expectedV, {} as any);

				expect(spy).toBeCalledWith(expectedV);
			});
		});

		describe('post', () => {
			it('should call getFile with path arg', () => {
				const spy = jest.spyOn(instance, 'getFile').mockImplementationOnce((): any => {});

				const expectedV = 'testpathnamepost';
				instance.post(expectedV, {} as any, {} as any);

				expect(spy).toBeCalledWith(expectedV);
			});
		});
	});
});
