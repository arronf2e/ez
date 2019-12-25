import { resolve } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';

import { EZ } from '../interface';

const debug = createDebug('resolve-source');

/** 解析源文件路径 */
export function resolveSource(ez: EZ) {
	const { cwd } = ez;
	/** 优先 src/index.tsx */

	const normalSource = resolve(cwd, 'src');
	const source = existsSync(normalSource) ? normalSource : cwd;

	debug(`sourcePath: ${source}`);
	return source;
}
