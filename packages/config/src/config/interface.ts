import WebpackChainConfig, { DevTool } from 'webpack-chain';

export interface Config {
	/** webpack alias */
	alias: object;
	/** 自定义 babelrc 配置, 默认 false */
	babelrc: boolean;
	/** webpack chain  */
	chainConfig: (webpackChainConfig: WebpackChainConfig) => undefined;
	/** WebpackDefine, 开发环境下,NODE_ENV强制为'development', 非开发环境下 NODE_ENV 强制为'production' */
	define: {
		[key: string]: string;
	};
	/** webpack devtool, 默认 false */
	devtool: DevTool;
	/** 禁用动态加载, 默认 false*/
	disableDynamicImport: boolean;
	/** 自定义 eslintrc 配置, 默认 false */
	eslintrc: boolean;
	/** 是否开启 hash 文件后缀, 默认 false */
	hash: boolean;
	/** host, 默认 0.0.0.0 */
	host: string;
	/** 是否压缩 html 文件, 默认 true */
	htmlMinify: boolean;
	/**项目名称, 默认 react-admin */
	name: string;
	/** 是否开启代码压缩, 默认 true */
	minimize: boolean;
	/** 输出路径, 默认 dist */
	outputPath: string;
	/** 监听请求的端口, 默认 9527 */
	port: number;
	/** 资源前缀, 默认 / */
	publicPath: string;
	/** 分离 webpackBootstrap 装载函数 ,默认 false*/
	runtimeChunk: boolean;
	/** 主题颜色 */
	themeColors: object;
	/** 是否开启 treeShaking, 删除未使用代码, 默认 false */
	treeShaking: boolean;
}

export type EzConfig = Partial<Config>;
