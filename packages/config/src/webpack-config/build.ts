import { getBaseConfig } from './base';
import { GetBuildConfig } from './interface';

export const getBuildConfig: GetBuildConfig = config => {
	const { sourcePath } = config;
	const webpackChainConfig = getBaseConfig({ sourcePath });

	return webpackChainConfig;
};
