import { getBaseConfig } from './base';
import { GetDevConfig } from './interface';

export const getDevConfig: GetDevConfig = config => {
	const { ...baseConfig } = config;
	const webpackChainConfig = getBaseConfig(baseConfig);

	webpackChainConfig.mode('development').devtool('cheap-module-eval-source-map');

	webpackChainConfig.output.publicPath('/').pathinfo(true);

	webpackChainConfig.module
		.rule('css')
		.test(/\.css$/)
		.use('style-loader')
		.loader(require.resolve('style-loader'))
		.end()
		.use('thread-loader')
		.loader(require.resolve('thread-loader'))
		.end()
		.use('css-loader')
		.loader(require.resolve('css-loader'));

	return webpackChainConfig;
};
