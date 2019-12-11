import { PkgInfo } from '@ez-fe/helper';

export interface Config {
	/** host, 默认 localhost */
	host: string;
	/** 监听请求的端口 */
	port: number;
}

export interface EZ {
	isWin: boolean;
	/** 当前工作路径 */
	cwd: string;
	/** 配置文件路径集合 */
	configPaths: string[];
	/** 当前项目信息 */
	pkgInfo: PkgInfo['packageJson'];
	/** 项目源码路径 */
	sourcePath: string;
	/** 项目配置 */
	config: Partial<Config>;
	/** 即时编译文件 */
	babelRegisterFiles: string[];

	/** 初始化方法 */
	init(): void;
	/** 加载包信息 */
	loadPkgInfo(): void;
	/** 解析源码目录 */
	resolveSource(): void;
}
