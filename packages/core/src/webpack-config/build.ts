import { resolve } from 'path';
import { getBaseConfig } from './base';
import { GetBuildConfig } from './interface';

export const getBuildConfig: GetBuildConfig = config => {
	const { publicPath, cwd, outputPath } = config;

	const webpackChainConfig = getBaseConfig(config);

	/** 模式(mode) */
	webpackChainConfig.mode('production');

	/** SourceMap(devtool) */
	webpackChainConfig.devtool('source-map');

	/** 输出(output) */
	const output = resolve(cwd, outputPath);
	webpackChainConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath);

	/** 统计信息(stats) */
	webpackChainConfig.stats({
		assets: true,
		builtAt: true,
		colors: true,
		chunks: false,
		children: false,
		env: true,
		entrypoints: false,
		errors: true,
		errorDetails: true,
		hash: true,
		modules: false,
		moduleTrace: true,
		performance: true,
		publicPath: true,
		timings: true,
		version: true,
		warnings: false,
	});

	return webpackChainConfig;
};
