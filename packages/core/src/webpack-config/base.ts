import { resolve, join } from 'path';
import { existsSync } from 'fs';
import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { getBabelConfig } from '../babel';
import { getEslintConfig } from '../eslint';
import { GetBaseConfig } from './interface';

export const getBaseConfig: GetBaseConfig = config => {
	const {
		alias,
		babelrc,
		cwd,
		disableDynamicImport,
		hash,
		htmlMinify,
		name: title,
		outputPath,
		sourcePath,
		treeShaking,
		themeColors,
	} = config;
	const webpackChainConfig = new Config();

	/** 入口和上下文(entry and context) */
	const entry = resolve(sourcePath, 'index.tsx');
	webpackChainConfig
		.context(cwd)
		.entry('main')
		.add(entry);

	/** 解析(resolve) */
	webpackChainConfig.resolve.alias
		.merge({
			'@': sourcePath,
			...alias,
		})
		.end()
		.extensions.merge(['.ts', '.tsx', '.js'])
		.end()
		.mainFiles.add('index')
		.end()
		.modules.add(sourcePath)
		.add('./node_modules');

	/** 模块(module) */
	const babelConfig = getBabelConfig({
		babelrc,
		themeColors,
		treeShaking,
		disableDynamicImport,
		cwd,
	});
	webpackChainConfig.module
		.rule('babel')
		.test(/\.((ts|js)(x?))$/)
		.exclude.add(/node_modules/)
		.end()
		.include.add(sourcePath)
		.end()
		.use('babel-loader')
		.loader(require.resolve('babel-loader'))
		.options(babelConfig);

	webpackChainConfig.module
		.rule('url')
		.test(/\.(jpe?g|png|gif|svg)$/)
		.use('url-loader')
		.loader(require.resolve('url-loader'))
		.options({
			limit: 8 * 1024,
			outputPath: 'images',
			name: '[path][name].[ext]',
		});

	const eslintConfig = getEslintConfig({ cwd, ...config });
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
	const publicDir = join(cwd, 'public');
	if (existsSync(publicDir)) {
		webpackChainConfig.plugin('copy').use(CopyWebpackPlugin, [
			[
				{
					from: publicDir,
					to: outputPath,
					toType: 'dir',
				},
			],
		]);
	}

	let template = join(cwd, 'public/index.html');
	let favicon = join(cwd, 'public/favicon.ico');
	const hasTemplate = existsSync(template);
	if (!hasTemplate) {
		template = resolve(__dirname, '..', '..', 'public/index.html');
	}

	const hasFavicon = existsSync(favicon);
	if (!hasFavicon) {
		favicon = resolve(__dirname, '..', '..', 'public/favicon.ico');
	}

	/** DefinePlugin */
	const { BUILD_ENV, NODE_ENV, define } = config;

	/** JSON.stringify 处理 */
	for (let key in define) {
		define[key] = JSON.stringify(define[key]);
	}
	webpackChainConfig.plugin('define').use(require('webpack').DefinePlugin, [
		{
			'process.env': { BUILD_ENV: JSON.stringify(BUILD_ENV), NODE_ENV: JSON.stringify(NODE_ENV) },
			...define,
		},
	]);

	/** HtmlWebpackPlugin */
	webpackChainConfig.plugin('html').use(HtmlWebpackPlugin, [
		{
			title,
			filename: 'index.html',
			template,
			hash,
			minify: htmlMinify
				? {
						removeRedundantAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true,
						collapseBooleanAttributes: true,
				  }
				: {},
			favicon,
		},
	]);

	/** CircularDependencyPlugin */
	webpackChainConfig.plugin('circular-dependency').use(CircularDependencyPlugin, [
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
