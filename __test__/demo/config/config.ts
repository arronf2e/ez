import { EzConfig } from '@ez-fe/config';

export default <EzConfig>{
	port: 12138,
	htmlMinify: true,
	chainConfig(webpackChainConfig) {
		webpackChainConfig.mode('development');
		webpackChainConfig.optimization.minimize(false);
		webpackChainConfig.devtool(false);
		webpackChainConfig.optimization.runtimeChunk(true);
		webpackChainConfig.optimization.splitChunks({
			chunks: 'all',
			minSize: 1000,
			maxSize: 0,
			minChunks: 1,
		});
	},
	define: {
		'process.env.todo': '123',
	},
};
