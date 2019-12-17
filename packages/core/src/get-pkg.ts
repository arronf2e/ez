import createDebug from 'debug';
import { getPkgInfo, PkgInfo, message } from '@ez-fe/helper';
import { EZ } from './interface';

const debug = createDebug('core:get-pkg');

export async function getPkg(ez: EZ): Promise<PkgInfo> {
	const { cwd } = ez;
	try {
		const pkgInfo = await getPkgInfo({ cwd });

		debug(`pkgInfo:${JSON.stringify(pkgInfo)}`);

		return pkgInfo;
	} catch (e) {
		message.error(e);
	}
}
