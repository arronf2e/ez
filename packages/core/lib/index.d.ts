export default class Ez {
	/** isWin */
	private isWin;
	/** 当前工作路径 */
	private cwd;
	/** 配置文件路径集合 */
	private configPaths;
	/** 当前项目信息 */
	private pkgInfo;
	/** 项目源码路径 */
	private sourcePath;
	/** 项目配置 */
	private config;
	constructor();
	init(): Promise<void>;
	loadPkgInfo(): Promise<void>;
	resolveSource(): void;
}
