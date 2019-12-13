import { getBaseConfig } from './base';
import { GetDevConfig } from './interface';

export const getDevConfig: GetDevConfig = config => {
	const { ...baseConfig } = config;
	const webpackChainConfig = getBaseConfig(baseConfig);

	return webpackChainConfig;
};
