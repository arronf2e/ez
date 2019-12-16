import WebpackChainConfig from 'webpack-chain';

export interface Config {
	/** host, 默认 0.0.0.0 */
	host: string;
	/** 监听请求的端口, 默认 9527 */
	port: number;
	/** 输出路径, 默认 dist */
	outputPath?: string;
	/** 资源前缀, 默认 / */
	publicPath?: string;
	/** 自定义 babelrc 配置, 默认 false */
	babelrc?: boolean;
	/** 禁用动态加载, 默认 false*/
	disableDynamicImport?: boolean;
	/** webpack chain  */
	chainConfig?: (webpackChainConfig: WebpackChainConfig) => WebpackChainConfig;
}
