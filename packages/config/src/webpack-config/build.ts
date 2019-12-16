import { getBaseConfig } from './base';
import { GetBuildConfig } from './interface';

export const getBuildConfig: GetBuildConfig = config => {
	const { publicPath } = config;

	const webpackChainConfig = getBaseConfig(config);
	webpackChainConfig.output.publicPath(publicPath);

	return webpackChainConfig;
};
