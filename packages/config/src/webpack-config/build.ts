import { getBaseConfig } from './base';
import { GetBuildConfig } from './interface';

export const getBuildConfig: GetBuildConfig = config => {
	const { ...baseConfig } = config;

	const webpackChainConfig = getBaseConfig(baseConfig);

	return webpackChainConfig;
};
