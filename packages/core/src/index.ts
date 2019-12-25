import WebpackChainConfig from 'webpack-chain';
import chokidar, { FSWatcher } from 'chokidar';
import { PkgInfo, isWin, Signale } from '@ez-fe/helper';
import { config, Config } from '@ez-fe/config';
import { getPlugins } from './plugin';
import { registerBabel } from './babel';
import { getPkg, resolveSource } from './helper';
import { getConfig, getConfigPaths } from './config';
import { getWebpackChainConfig } from './webpack-config';
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
	webpackConfig?: WebpackChainConfig;
	fileMonitor: FSWatcher;
	tip: Signale = new Signale({
		interactive: true,
	});

	constructor({ NODE_ENV, BUILD_ENV }: ENV) {
		this.isWin = isWin();
		this.cwd = process.cwd();
		this.NODE_ENV = NODE_ENV;
		this.BUILD_ENV = BUILD_ENV;
		this.fileMonitor = chokidar.watch([]);

		this.sourcePath = resolveSource(this);
		/** 配置文件 babel 转码 */
		this.registerBabel(getConfigPaths(this));
		this.registerFileMonitor();
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

	registerFileMonitor() {
		this.fileMonitor = chokidar
			.watch([])
			.on('ready', () => console.log('Initial scan complete. Ready for changes'))
			.on('add', path => {
				console.log(path, 'add');
			})
			.on('change', path => {
				console.log(path, 'change');
			});
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
