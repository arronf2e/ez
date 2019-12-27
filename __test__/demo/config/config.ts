import { Config } from '@ez-fe/config';

export default <Config>{
	port: 12138,
	chainConfig(webpackChainConfig) {
		webpackChainConfig.mode('development');
		webpackChainConfig.optimization.minimize(false);
		webpackChainConfig.devtool(false);
		// webpackChainConfig.optimization.runtimeChunk(true);
		// webpackChainConfig.optimization.splitChunks({
		// 	chunks: 'all',
		// 	minSize: 1000,
		// 	maxSize: 0,
		// 	minChunks: 1,
		// });
	},
};
