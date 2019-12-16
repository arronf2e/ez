import createDebug from 'debug';
import { Configuration } from 'webpack';
import { Config } from '@ez-fe/config';
import { EZ } from './interface';

const debug = createDebug('ez:get-webpack-config');

export async function getWebpackConfig(ez: EZ): Promise<Configuration> {
	const { sourcePath } = ez;
	let webpackConfig = null;
	const { getWebpackChainConfig } = await import('@ez-fe/config');
	const { config, cwd } = ez;
	const { chainConfig } = config;

	const webpackChainConfig = getWebpackChainConfig({ cwd, sourcePath, ...(<Required<Config>>config) });

	if (chainConfig) {
		webpackConfig = chainConfig(webpackChainConfig).toConfig();
	} else {
		webpackConfig = webpackChainConfig.toConfig();
	}

	debug(JSON.stringify(webpackConfig));
	return webpackConfig;
}
