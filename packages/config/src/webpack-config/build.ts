import { resolve } from 'path';
import { getBaseConfig } from './base';
import { GetBuildConfig } from './interface';

export const getBuildConfig: GetBuildConfig = config => {
	const { publicPath, cwd, outputPath } = config;

	const webpackChainConfig = getBaseConfig(config);

	/** 输出(output) */
	const output = resolve(cwd, outputPath);
	webpackChainConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath);

	return webpackChainConfig;
};
