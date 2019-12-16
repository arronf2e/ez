import { resolve } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';
import { Configuration } from 'webpack';
import { getPkgInfo, PkgInfo, isWin, message } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getConfig, getConfigPaths } from './get-config';
import { getWebpackConfig } from './get-webpack-config';
import { registerBabel } from './register-babel';
import { EZ, NODE_ENV } from './interface';

const debug = createDebug('core');

export default class Ez implements EZ {
	isWin: boolean;
	NODE_ENV: NODE_ENV;
	cwd: string;
	configPaths: string[] = [];
	pkgInfo: PkgInfo;
	sourcePath: string = '';
	babelRegisterFiles: string[] = [];
	config: Config = config;
	webpackConfig: Configuration = {};

	constructor({ NODE_ENV }: { NODE_ENV: NODE_ENV }) {
		this.isWin = isWin();
		this.cwd = process.cwd();
		this.NODE_ENV = NODE_ENV;
	}

	async init() {
		this.loadPkgInfo();
		this.resolveSource();
		this.registerBabel();

		this.config = await getConfig(this);
		debug(`userConfig: ${JSON.stringify(this.config)}`);
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
