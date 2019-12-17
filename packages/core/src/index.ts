import { Configuration } from 'webpack';
import { PkgInfo, isWin } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getPkg } from './get-pkg';
import { resolveSource } from './resolve-source';
import { getConfig, getConfigPaths } from './get-config';
import { getWebpackConfig } from './get-webpack-config';
import { getPlugins } from './get-plugins';
import { registerBabel } from './register-babel';
import { EZ, NODE_ENV, Plugins } from './interface';

export default class Ez implements EZ {
	isWin: boolean;
	NODE_ENV: NODE_ENV;
	cwd: string;
	configPaths: string[] = [];
	pkgInfo: PkgInfo;
	sourcePath: string = '';
	babelRegisterFiles: string[] = [];
	config: Config = config;
	plugins: Plugins = [];
	webpackConfig: Configuration = {};

	constructor({ NODE_ENV }: { NODE_ENV: NODE_ENV }) {
		this.isWin = isWin();
		this.cwd = process.cwd();
		this.NODE_ENV = NODE_ENV;
	}

	async init() {
		this.pkgInfo = await getPkg(this);
		this.sourcePath = resolveSource(this);

		this.registerBabel(getConfigPaths(this));

		this.config = await getConfig(this);
		this.webpackConfig = await getWebpackConfig(this);
		this.plugins = await getPlugins(this);
	}

	registerBabel(files: string[]) {
		this.babelRegisterFiles = Array.prototype.concat(this.babelRegisterFiles, files);
		registerBabel(this);
	}
}
