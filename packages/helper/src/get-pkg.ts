import { NormalizedReadResult } from 'read-pkg-up';
import { resolve } from 'path';
import { message } from './message';
import { em } from './highlights';
import { dynamicImport } from './dynamic-import';

export async function getPkgInfo({ cwd }: { cwd: string }): Promise<PkgInfo> | never {
	try {
		const packagePath = resolve(cwd, 'package.json');
		return await dynamicImport<PkgInfo>(packagePath);
	} catch (e) {
		message.error(`No related package configuration(${em('package.json')}) found!`);
		process.exit(-1);
	}
}

export type PkgInfo = NormalizedReadResult['packageJson'];
