import { GetDevConfig } from '../interface';

export const getDevConfig: GetDevConfig = (webpackChainConfig, extraConfig) => {
	const { host, port, themeColors } = extraConfig;
	/** 模式(mode) */
	webpackChainConfig.mode('development');

	/** 统计信息(stats) */
	webpackChainConfig.stats('none');

	/** devServer */
	webpackChainConfig.devServer.host(host);
	webpackChainConfig.devServer.port(port);
	webpackChainConfig.devServer.public(`localhost:${port}`);
	webpackChainConfig.devServer.open(false);
	webpackChainConfig.devServer.hot(true);
	webpackChainConfig.devServer.quiet(true);
	webpackChainConfig.devServer.overlay({
		warnings: true,
		errors: true,
	});
	webpackChainConfig.devServer.historyApiFallback(true);
	webpackChainConfig.devServer.clientLogLevel('warning');

	/** SourceMap(devtool) */
	webpackChainConfig.devtool('cheap-module-eval-source-map');

	/** 输出(mode) */
	webpackChainConfig.output.publicPath('/').pathinfo(true);

	/** 模块(module) */
	const postcssConfig = {
		ident: 'postcss',
		plugins: () => [
			require('postcss-preset-env')({
				browsers: ['Chrome >= 52', 'FireFox >= 44', 'Safari >= 7', 'last 2 Edge versions', 'IE 10'],
			}),
		],
	};
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
		.loader(require.resolve('css-loader'))
		.end()
		.use('postcss-loader')
		.loader(require.resolve('postcss-loader'))
		.options(postcssConfig)
		.end();

	webpackChainConfig.module
		.rule('less')
		.test(/\.less$/)
		.use('style-loader')
		.loader(require.resolve('style-loader'))
		.end()
		.use('thread-loader')
		.loader(require.resolve('thread-loader'))
		.end()
		.use('css-loader')
		.loader(require.resolve('css-loader'))
		.end()
		.use('postcss-loader')
		.loader(require.resolve('postcss-loader'))
		.options(postcssConfig)
		.end()
		.use('less-loader')
		.loader(require.resolve('less-loader'))
		.options({
			javascriptEnabled: true,
			modifyVars: themeColors,
		})
		.end();

	return webpackChainConfig;
};
