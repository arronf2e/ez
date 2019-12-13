import slash from 'slash';

/** 是否为 win 平台 */
export function isWin() {
	return process.platform.includes('win');
}

/** 格式化 win 路径格式 */
export function formatWinPath(path: string) {
	return slash(path);
}
