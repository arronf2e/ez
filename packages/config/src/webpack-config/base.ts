import { resolve } from 'path';
import Config from 'webpack-chain';
import { getBabelConfig } from '../babel';
import { GetBaseConfig } from './interface';

export const getBaseConfig: GetBaseConfig = config => {
	const { sourcePath, publicPath, outputPath, cwd, babelrc, disableDynamicImport } = config;
	const webpackChainConfig = new Config();

	/** 入口和上下文(entry and context) */
	const entry = resolve(sourcePath, 'index.tsx');
	webpackChainConfig
		.context(cwd)
		.entry('main')
		.add(entry);

	/** 输出(output) */
	const output = resolve(cwd, outputPath);
	webpackChainConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath);

	/** 解析(resolve) */
	webpackChainConfig.resolve.alias
		.merge({
			'@': sourcePath,
		})
		.end()
		.extensions.merge(['.ts', '.tsx', '.js'])
		.end()
		.mainFiles.add('index')
		.end()
		.modules.add(sourcePath)
		.add('node_modules');

	/** 模块(module) */
	const babelConfig = getBabelConfig({ babelrc, disableDynamicImport });
	webpackChainConfig.module
		.rule('babel')
		.test(/\.((ts|js)(x?))$/)
		.exclude.add(/node_modules/)
		.end()
		.include.add(sourcePath)
		.end()
		.use('babel-loader')
		.loader(require.resolve('babel-loader'))
		.options(babelConfig)
		.end()
		.end()
		.rule('url')
		.test(/\.(jpe?g|png|gif|svg)$/)
		.use('url-loader')
		.loader(require.resolve('url-loader'))
		.options({
			limit: 8 * 1024,
			outputPath: 'images',
			name: '[path][name].[ext]',
		});

	/** 插件(plugins) */

	return webpackChainConfig;
};
