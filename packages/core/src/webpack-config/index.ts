import WebpackChainConfig from 'webpack-chain';
import { Config } from '@ez-fe/config';
import { getBaseConfig } from './base';
import { EZ } from '../interface';

/** 获取 webpack 配置 */
export async function getWebpackChainConfig(ez: EZ): Promise<WebpackChainConfig> {
	const { sourcePath, NODE_ENV, BUILD_ENV } = ez;
	const { config, cwd } = ez;

	const webpackChainConfig = getBaseConfig({
		cwd,
		sourcePath,
		NODE_ENV,
		BUILD_ENV,
		...(<Required<Config>>config),
	});

	return webpackChainConfig;
}
