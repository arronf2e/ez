import WebpackChainConfig from 'webpack-chain';
import { Config } from '@ez-fe/config';
import { PkgInfo } from '@ez-fe/helper';

export type NODE_ENV = 'development' | 'production';

export type BUILD_ENV = 'development' | 'uat' | 'production';

export type ENV = { NODE_ENV: NODE_ENV; BUILD_ENV: BUILD_ENV };

export interface EZ {
	/** NODE_ENV */
	NODE_ENV: NODE_ENV;
	/** BUILD_ENV */
	BUILD_ENV: BUILD_ENV;
	/** isWin */
	isWin: boolean;
	/** 当前工作路径 */
	cwd: string;
	/** 配置文件路径集合 */
	configPaths: string[];
	/** 当前项目信息 */
	pkgInfo: PkgInfo;
	/** 项目源码路径 */
	sourcePath: string;
	/** 即时编译文件 */
	babelRegisterFiles: string[];
	/** 项目配置 */
	config: Config;
	/** 插件列表 */
	plugins: Plugin[];
	/** webpack 配置 */
	webpackConfig?: WebpackChainConfig;

	/** 获取包信息 */
	getPkg(): Promise<void>;
	/** 获取用户配置 */
	getConfig(): Promise<void>;
	/** 获取插件配置 */
	getPlugins(): Promise<void>;
	/** 获取 webpack 配置 */
	getWebpackConfig(): Promise<void>;
	/** 注册 babel 文件 */
	registerBabel(files: string[]): void;
}

export interface Plugin {
	install: (ez: EZ, options: object) => void;
}

export type Plugins = Plugin[];
