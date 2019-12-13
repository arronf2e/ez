import WebpackChainConfig from 'webpack-chain';

export interface Config {
	/** host, 默认 0.0.0.0 */
	host: string;
	/** 监听请求的端口 */
	port: number;
	/** 资源前缀 */
	publicPath?: string;
	/** webpack chain  */
	chainConfig?: (webpackChainConfig: WebpackChainConfig) => WebpackChainConfig;
}
