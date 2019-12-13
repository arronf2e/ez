import { resolve } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';
import { Configuration } from 'webpack';
import { getPkgInfo, PkgInfo, isWin, message } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getConfig, getConfigPaths } from './get-config';
import { getWebpackConfig } from './get-webpack-config';
import { registerBabel } from './register-babel';
import { EZ } from './interface';

const debug = createDebug('ez:core');

export default class Ez implements EZ {
	isWin: boolean;
	cwd: string;
	configPaths: string[] = [];
	pkgInfo: PkgInfo;
	sourcePath: string = '';
	babelRegisterFiles: string[] = [];
	config: Config = config;
	webpackConfig: Configuration = {};

	constructor() {
		this.cwd = process.cwd();
		this.isWin = isWin();

		this.init();
	}

	async init() {
		this.loadPkgInfo();
		this.resolveSource();
		this.registerBabel();

		this.config = await getConfig(this);
		this.webpackConfig = await getWebpackConfig(this);
	}

	async loadPkgInfo() {
		try {
			const pkgInfo = await getPkgInfo({ cwd: this.cwd });
			this.pkgInfo = pkgInfo;
			debug(`pkgInfo:${JSON.stringify(this.pkgInfo)}`);
		} catch (e) {
			message.error(e);
		}
	}

	resolveSource() {
		const { cwd } = this;
		const normalSource = resolve(cwd, 'src');
		const source = existsSync(normalSource) ? normalSource : cwd;

		this.sourcePath = source;
		debug(`sourcePath: ${this.sourcePath}`);
	}

	registerBabel() {
		this.babelRegisterFiles = Array.prototype.concat([], getConfigPaths(this));
		registerBabel(this);
	}
}
