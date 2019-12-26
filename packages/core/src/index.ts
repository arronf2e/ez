import WebpackChainConfig from 'webpack-chain';
import chokidar, { FSWatcher } from 'chokidar';
import { PkgInfo, isWin } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { registerBabel } from './babel';
import { getConfig, getConfigPaths } from './config';
import { getPkg, resolveSource } from './helper';
import { EZ, NODE_ENV, BUILD_ENV, ENV, Plugins } from './interface';
import { getPlugins } from './plugin';
import { getWebpackChainConfig } from './webpack-config';

export * from './helper';

export default class Ez implements EZ {
	isWin: boolean;
	NODE_ENV: NODE_ENV;
	BUILD_ENV: BUILD_ENV;
	cwd: string;
	configPaths: string[] = [];
	pkgInfo: PkgInfo;
	sourcePath: string = '';
	babelRegisterFiles: string[] = [];
	config: Config = config;
	plugins: Plugins = [];
	webpackConfig?: WebpackChainConfig;
	fileMonitor: FSWatcher;

	constructor({ NODE_ENV, BUILD_ENV }: ENV) {
		this.isWin = isWin();
		this.cwd = process.cwd();
		this.NODE_ENV = NODE_ENV;
		this.BUILD_ENV = BUILD_ENV;
		this.fileMonitor = chokidar.watch([]);

		this.sourcePath = resolveSource(this);
		/** 配置文件 babel 转码 */
		this.registerBabel(getConfigPaths(this));
	}

	async getPkg() {
		this.pkgInfo = await getPkg(this);
	}

	async getConfig() {
		this.config = await getConfig(this);
	}

	async getPlugins() {
		this.plugins = await getPlugins(this);
	}

	async getWebpackConfig() {
		this.webpackConfig = await getWebpackChainConfig(this);
	}

	registerFileMonitor({
		add = () => {},
		change = () => {},
	}: {
		add: (why: string) => void;
		change: (why: string) => void;
	}) {
		this.fileMonitor.on('add', add).on('change', change);
	}

	watchFiles(files: string[]) {
		this.fileMonitor.add(files);
	}

	registerBabel(files: string[]) {
		this.babelRegisterFiles = Array.prototype.concat(this.babelRegisterFiles, files);
		registerBabel(this);
		this.watchFiles(files);
	}
}
