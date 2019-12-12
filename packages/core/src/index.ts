import { resolve } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';
import { getPkgInfo, PkgInfo, isWin, message } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getUserConfig, getConfigPaths } from './get-config';
import { registerBabel } from './register-babel';
import { EZ } from './interface';

const debug = createDebug('ez:core');

export default class Ez implements EZ {
	/** isWin */
	isWin: boolean;
	/** 当前工作路径 */
	cwd: string;
	/** 配置文件路径集合 */
	configPaths: string[] = [];
	/** 当前项目信息 */
	pkgInfo: PkgInfo['packageJson'];
	/** 项目源码路径 */
	sourcePath: string = '';
	/** 项目配置 */
	config: Partial<Config> = config;
	/** 即时编译文件 */
	babelRegisterFiles: string[] = [];

	constructor() {
		this.cwd = process.cwd();
		this.isWin = isWin();

		this.init();
	}

	async init() {
		this.loadPkgInfo();
		this.resolveSource();
		this.registerBabel();

		this.config = await getUserConfig(this);
		debug(`config:${JSON.stringify(this.config)}`);
	}

	/** 加载包信息 */
	async loadPkgInfo() {
		try {
			const pkgInfo = await getPkgInfo({ cwd: this.cwd });
			this.pkgInfo = pkgInfo;
			debug(`pkgInfo:${JSON.stringify(this.pkgInfo)}`);
		} catch (e) {
			message.error(e);
		}
	}

	/** 解析源文件夹 */
	resolveSource() {
		const { cwd } = this;
		const normalSource = resolve(cwd, 'src');
		const source = existsSync(normalSource) ? normalSource : cwd;

		this.sourcePath = source;
		debug(`sourcePath: ${this.sourcePath}`);
	}

	/** 注册 babel 文件 */
	registerBabel() {
		this.babelRegisterFiles = Array.prototype.concat([], getConfigPaths(this));
		registerBabel(this);
	}
}
