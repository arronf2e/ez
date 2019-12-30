import WebpackChainConfig from 'webpack-chain';

interface ExtraConfig {
	cwd: string;
	output: string;
	publicPath: string;
	themeColors: object;
}

export function getBuildConfig(
	webpackChainConfig: WebpackChainConfig,
	{ cwd, output, publicPath, themeColors }: ExtraConfig
) {
	/** 模式(mode) */
	webpackChainConfig.mode('production');

	/** SourceMap(devtool) */
	webpackChainConfig.devtool('source-map');

	/** 输出(output) */
	webpackChainConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath as string);

	/** 统计信息(stats) */
	webpackChainConfig.stats('none');

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

	webpackChainConfig.module
		.rule('less')
		.test(/\.css$/)
		.use('style-loader')
		.loader(require.resolve('style-loader'))
		.end()
		.use('thread-loader')
		.loader(require.resolve('thread-loader'))
		.end()
		.use('css-loader')
		.loader(require.resolve('css-loader'))
		.end()
		.use('less-loader')
		.loader(require.resolve('less-loader'))
		.options({
			options: { javascriptEnabled: true, modifyVars: themeColors },
		});

	return webpackChainConfig;
}
