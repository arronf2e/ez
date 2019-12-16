import { resolve, join } from 'path';
import { existsSync } from 'fs';
import Config from 'webpack-chain';
import { getBabelConfig } from '../babel';
import { getEslintConfig } from '../eslint';
import { GetBaseConfig } from './interface';

export const getBaseConfig: GetBaseConfig = config => {
	const { name: title, sourcePath, publicPath, outputPath, cwd, babelrc, disableDynamicImport } = config;
	const webpackChainConfig = new Config();

	/** 入口和上下文(entry and context) */
	const entry = resolve(sourcePath, 'index.tsx');
	webpackChainConfig
		.context(cwd)
		.entry('main')
		.add(entry);

	/** 输出(output) */
	const output = resolve(cwd, outputPath);
	webpackChainConfig.output.path(output).filename('js/[chunkhash:8].js');

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
	const babelConfig = getBabelConfig({
		babelrc,
		disableDynamicImport,
		cwd,
	});
	const eslintConfig = getEslintConfig({ cwd, ...config });
	webpackChainConfig.module
		.rule('babel')
		.test(/\.((ts|js)(x?))$/)
		.pre()
		.exclude.add(/node_modules/)
		.end()
		.include.add(sourcePath)
		.end()
		.use('babel-loader')
		.loader(require.resolve('babel-loader'))
		.options(babelConfig);

	webpackChainConfig.module
		.rule('url')
		.pre()
		.test(/\.(jpe?g|png|gif|svg)$/)
		.use('url-loader')
		.loader(require.resolve('url-loader'))
		.options({
			limit: 8 * 1024,
			outputPath: 'images',
			name: '[path][name].[ext]',
		});

	webpackChainConfig.module
		.rule('eslint')
		.test(/\.(js|jsx|ts|tsx)$/)
		.pre()
		.include.add(cwd)
		.end()
		.exclude.add(/node_modules/)
		.end()
		.enforce('pre')
		.use('eslint-loader')
		.loader(require.resolve('eslint-loader'))
		.options(eslintConfig);

	/** 插件(plugins) */
	webpackChainConfig.plugin('progress').use(require('webpackbar'), [
		{
			color: 'green',
		},
	]);

	const publicDir = join(cwd, 'public');
	if (existsSync(publicDir)) {
		webpackChainConfig.plugin('copy').use(require('copy-webpack-plugin'), [
			[
				{
					from: publicPath,
					to: outputPath,
					toType: 'dir',
				},
			],
		]);
	}

	const template = join(cwd, 'public/index.html');
	const favicon = join(cwd, 'public/favicon.ico');
	webpackChainConfig.plugin('html').use(require('html-webpack-plugin'), [
		{
			title,
			filename: 'index.html',
			template,
			hash: true,
			minify: {
				removeRedundantAttributes: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true,
				collapseBooleanAttributes: true,
			},
			favicon,
		},
	]);

	webpackChainConfig.plugin('circular-dependency').use(require('circular-dependency-plugin'), [
		{
			exclude: /node_modules/,
			include: /src/,
			failOnError: true,
			allowAsyncCycles: false,
			cwd,
		},
	]);

	return webpackChainConfig;
};
