export async function dynamicImport<T>(targetpath: string) {
  return (await import(targetpath)) as T;
}
