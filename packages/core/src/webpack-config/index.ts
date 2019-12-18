import { getDevConfig } from './dev';
import { getBuildConfig } from './build';

export const getWebpackChainConfig = {
	development: getDevConfig,
	production: getBuildConfig,
};
