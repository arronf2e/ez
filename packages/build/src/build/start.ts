import rimraf from 'rimraf';
import { resolve } from 'path';
import webpack from 'webpack';
import WebpackChainConfig from 'webpack-chain';

import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { message, SignaleMethods } from '@ez-fe/helper';
import { sendTip } from '@ez-fe/core';
import { getBuildConfig } from './webpack-config';

const totalStep = 6;

const tip = (type: SignaleMethods, content: string) => {
	sendTip({
		type,
		content,
	});
};

export async function start(BUILD_ENV: BUILD_ENV) {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	/** 获取包信息 */
	tip('await', `[1/${totalStep}] Getting package information...`);
	await ez.getPkg();

	/** 获取用户配置 */
	tip('await', `[2/${totalStep}] Getting user configuration...`);
	await ez.getConfig();

	/** 获取用户配置 */

	tip('await', `[3/${totalStep}] Getting plugin configuration...`);
	await ez.getPlugins();

	/** 获取 webpack 公用配置 */
	tip('await', `[4/${totalStep}] Getting webpack configuration...`);

	await ez.getWebpackConfig();

	const {
		cwd,
		webpackChainConfig,
		config: { outputPath, publicPath, chainConfig, themeColors, devtool, minimize, runtimeChunk },
	} = ez;
	const output = resolve(cwd, outputPath as string);

	if (!webpackChainConfig) {
		message.error('webpack build config error!');
		process.exit(-1);
	}

	getBuildConfig(webpackChainConfig as WebpackChainConfig, {
		output,
		publicPath,
		themeColors,
		devtool,
		minimize,
		runtimeChunk,
	});

	if (chainConfig) {
		chainConfig(webpackChainConfig);
	}

	const webpackBuildConfig = webpackChainConfig.toConfig();

	tip('await', `[5/${totalStep}] 🗑 Clean output path ${output}`);

	rimraf.sync(output);

	/** 构建 */
	tip('await', `[6/${totalStep}] 📦  Building`);

	webpack(webpackBuildConfig, (err, stats) => {
		if (err) {
			sendTip({
				type: 'error',
				content: err.message,
			});
		} else {
			const { startTime = 0, endTime = 0 } = stats;
			sendTip({
				type: 'success',
				content: `Compiled successfully in ${endTime - startTime} ms`,
			});
		}

		process.exit(0);
	});
}
