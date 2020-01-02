import { existsSync } from 'fs';
import { resolve } from 'path';
import WebpackChainConfig, { DevTool } from 'webpack-chain';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

interface ExtraConfig {
	cwd: string;
	output: string;
	publicPath: string;
	themeColors: object;
	devtool: DevTool;
	minimize: boolean;
	runtimeChunk: boolean;
}

export function getBuildConfig(webpackChainConfig: WebpackChainConfig, extraConfig: ExtraConfig) {
	const { cwd, output, themeColors, devtool, publicPath, minimize, runtimeChunk } = extraConfig;
	/** 模式(mode) */
	webpackChainConfig.mode('production');

	/** SourceMap(devtool) */
	webpackChainConfig.devtool(devtool);

	/** 输出(output) */
	webpackChainConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath as string);

	/** 统计信息(stats) */
	webpackChainConfig.stats('none');

	/** 模块(module) */
	const hasPostCssConfig = [
		'.postcssrc',
		'.postcssrc.json',
		'.postcssrc.yml',
		'.postcssrc.js',
		'postcss.config.js',
	].some(fileName => existsSync(resolve(cwd, fileName)));

	webpackChainConfig.module
		.rule('css')
		.test(/\.css$/)
		.use('mini-css')
		.loader(MiniCssExtractPlugin.loader)
		.options({
			publicPath,
		})
		.end()
		.use('thread-loader')
		.loader(require.resolve('thread-loader'))
		.end()
		.use('css-loader')
		.loader(require.resolve('css-loader'))
		.end()
		.use('postcss-loader')
		.loader(require.resolve('postcss-loader'))
		.options({
			config: {
				path: hasPostCssConfig ? cwd : resolve('../../../core/lib/postcss'),
			},
		});

	webpackChainConfig.module
		.rule('less')
		.test(/\.less$/)
		.use('mini-css')
		.loader(MiniCssExtractPlugin.loader)
		.options({
			publicPath,
		})
		.end()
		.use('thread-loader')
		.loader(require.resolve('thread-loader'))
		.end()
		.use('css-loader')
		.loader(require.resolve('css-loader'))
		.end()
		.use('postcss-loader')
		.loader(require.resolve('postcss-loader'))
		.options({
			config: {
				path: hasPostCssConfig ? cwd : __dirname,
			},
		})
		.end()
		.use('less-loader')
		.loader(require.resolve('less-loader'))
		.options({ javascriptEnabled: true, modifyVars: themeColors });

	/** 插件(plugins) */
	webpackChainConfig.plugin('optimize-css').use(OptimizeCssAssetsPlugin, []);
	webpackChainConfig.plugin('mini-css').use(MiniCssExtractPlugin, [
		{
			filename: 'css/[contenthash:8].css',
			chunkFilename: 'css/[contenthash:8].css',
			ignoreOrder: true,
		},
	]);

	/** 优化(optimization) */
	webpackChainConfig.optimization.minimize(minimize);
	webpackChainConfig.optimization.runtimeChunk(runtimeChunk);
	webpackChainConfig.optimization.minimizer('terser').use(TerserPlugin, [
		{
			test: /\.js(\?.*)?$/i,
			cache: true,
			parallel: true,
			extractComments: false,
			terserOptions: {
				compress: {
					warnings: false,
					drop_console: true,
					drop_debugger: true,
				},
				output: {
					comments: false,
				},
			},
		},
	]);
	webpackChainConfig.optimization.splitChunks({
		chunks: 'all',
		minSize: 1000,
		maxSize: 0,
		minChunks: 1,
	});

	return webpackChainConfig;
}
