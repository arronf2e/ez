import createDebug from 'debug';
import { Configuration } from 'webpack';
import { Config } from '@ez-fe/config';
import { getWebpackChainConfig } from './webpack-config';
import { EZ } from './interface';

const debug = createDebug('ez:get-webpack-config');

/** 获取 webpack 配置 */
export async function getWebpackConfig(ez: EZ): Promise<Configuration> {
	let webpackConfig = null;
	const { sourcePath, NODE_ENV, BUILD_ENV } = ez;
	const { config, cwd } = ez;
	const { chainConfig } = config;

	const webpackChainConfig = getWebpackChainConfig[NODE_ENV]({
		cwd,
		sourcePath,
		NODE_ENV,
		BUILD_ENV,
		...(<Required<Config>>config),
	});

	if (chainConfig) {
		webpackConfig = chainConfig(webpackChainConfig).toConfig();
	} else {
		webpackConfig = webpackChainConfig.toConfig();
	}

	debug(JSON.stringify(webpackConfig));
	return webpackConfig;
}
