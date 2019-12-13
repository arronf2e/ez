import { getDevConfig } from './dev';
import { getBuildConfig } from './build';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

export const getWebpackChainConfig = isDev ? getDevConfig : getBuildConfig;
