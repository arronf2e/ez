export async function dynamicImport<T>(targetpath: string): Promise<T> {
  return await import(targetpath);
}
