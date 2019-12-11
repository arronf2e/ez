export async function dynamicImport<T>(targetpath: string): Promise<T> {
	const result = await import(targetpath);
	return result && result.default ? result.default : result;
}
