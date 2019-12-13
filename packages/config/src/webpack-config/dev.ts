import { getBaseConfig } from './base';
import { GetDevConfig } from './interface';

export const getDevConfig: GetDevConfig = config => {
	const { sourcePath } = config;
	const webpackChainConfig = getBaseConfig({ sourcePath });

	return webpackChainConfig;
};
