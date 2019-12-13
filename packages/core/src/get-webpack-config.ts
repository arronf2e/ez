import createDebug from 'debug';
import { Configuration } from 'webpack';
import { EZ } from './interface';

const debug = createDebug('ez:get-webpack-config');

export async function getWebpackConfig(ez: EZ): Promise<Configuration> {
	const { sourcePath } = ez;
	let webpackConfig = null;
	const { getWebpackChainConfig } = await import('@ez-fe/config');

	const {
		config: { publicPath, chainConfig },
	} = ez;

	const webpackChainConfig = getWebpackChainConfig({
		sourcePath,
		publicPath,
	});

	if (chainConfig) {
		webpackConfig = chainConfig(webpackChainConfig).toConfig();
	}

	webpackConfig = webpackChainConfig.toConfig();

	debug(JSON.stringify(webpackConfig));
	return webpackConfig;
}
