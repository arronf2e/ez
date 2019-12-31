import { EzConfig } from '@ez-fe/config';

export default <EzConfig>{
	port: 12138,
	htmlMinify: true,
	minimize: false,
	devtool: false,
	runtimeChunk: true,
	chainConfig(webpackChainConfig) {
		// webpackChainConfig.mode('development');
	},
	define: {
		'process.env.todo': '123',
	},
};
