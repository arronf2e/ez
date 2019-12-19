import { Configuration } from 'webpack';
import chokidar, { FSWatcher } from 'chokidar';
import { PkgInfo, isWin } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getPkg } from './get-pkg';
import { getPlugins } from './get-plugins';
import { registerBabel } from './register-babel';
import { resolveSource } from './resolve-source';
import { getConfig, getConfigPaths } from './get-config';
import { getWebpackConfig } from './webpack-config';
import { EZ, NODE_ENV, BUILD_ENV, ENV, Plugins } from './interface';

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
	webpackConfig: Configuration = {};
	fileMonitor: FSWatcher;

	constructor({ NODE_ENV, BUILD_ENV }: ENV) {
		this.isWin = isWin();
		this.cwd = process.cwd();
		this.NODE_ENV = NODE_ENV;
		this.BUILD_ENV = BUILD_ENV;
		this.fileMonitor = chokidar.watch([]);
	}

	async init() {
		this.pkgInfo = await getPkg(this);
		this.sourcePath = resolveSource(this);

		/** 配置文件 babel 转码 */
		this.registerBabel(getConfigPaths(this));

		await this.getConfig();
		await this.getPlugins();
		await this.getWebpackConfig();

		this.fileMonitor.on('ready', () => console.log('Initial scan complete. Ready for changes'));
		this.fileMonitor.on('add', path => {
			console.log(path, 'add');
		});
		this.fileMonitor.on('change', path => {
			console.log(path, 'change');
		});
	}

	async getConfig() {
		this.config = await getConfig(this);
	}

	async getPlugins() {
		this.plugins = await getPlugins(this);
	}

	async getWebpackConfig() {
		this.webpackConfig = await getWebpackConfig(this);
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
