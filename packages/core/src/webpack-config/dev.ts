import { getBaseConfig } from './base';
import { GetDevConfig } from './interface';

export const getDevConfig: GetDevConfig = config => {
	const { ...baseConfig } = config;
	const webpackChainConfig = getBaseConfig(baseConfig);

	/** 模式(mode) */
	webpackChainConfig.mode('development');

	/** SourceMap(devtool) */
	webpackChainConfig.devtool('cheap-module-eval-source-map');

	/** 输出(mode) */
	webpackChainConfig.output.publicPath('/').pathinfo(true);

	/** 模块(module) */
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
