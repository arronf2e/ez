import readPkgUp from 'read-pkg-up';
import { resolve } from 'path';
import { message } from './message';

export async function getPkgInfo({ cwd }: { cwd: string }): Promise<PkgInfo> | never {
  try {
    return (await import(resolve(cwd, 'package.json'))) as PkgInfo;
  } catch (e) {
    message.error('No related package configuration found!');
    process.exit(-1);
  }
}

export type PkgInfo = readPkgUp.NormalizedReadResult['packageJson'];
