import rimraf from 'rimraf';
import { resolve } from 'path';
import webpack from 'webpack';
import WebpackChainConfig from 'webpack-chain';

import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { message } from '@ez-fe/helper';
import { sendTip } from '@ez-fe/core';
import { getBuildConfig } from './webpack-config';

const totalStep = 6;

export async function start(BUILD_ENV: BUILD_ENV) {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	/** 获取包信息 */
	sendTip({
		type: 'await',
		content: `[1/${totalStep}] Getting package information...`,
	});
	await ez.getPkg();

	/** 获取用户配置 */
	sendTip({
		type: 'await',
		content: `[2/${totalStep}] Getting user configuration...`,
	});
	await ez.getConfig();

	/** 获取用户配置 */
	sendTip({
		type: 'await',
		content: `[3/${totalStep}] Getting plugin configuration...`,
	});
	await ez.getPlugins();

	/** 获取 webpack 公用配置 */
	sendTip({
		type: 'await',
		content: `[4/${totalStep}] Getting webpack configuration...`,
	});
	await ez.getWebpackConfig();

	/** 构建 */
	sendTip({
		type: 'pending',
		content: `[5/${totalStep}] Building`,
	});

	const {
		webpackConfig,
		cwd,
		config: { outputPath, publicPath = '/', chainConfig, themeColors = {} },
	} = ez;
	const output = resolve(cwd, outputPath as string);

	if (!webpackConfig) {
		return message.error('webpack build config error!');
	}

	getBuildConfig(webpackConfig as WebpackChainConfig, {
		cwd,
		output,
		publicPath,
		themeColors,
	});

	if (chainConfig) {
		chainConfig(webpackConfig);
	}

	const webpackBuildConfig = webpackConfig.toConfig();

	sendTip({
		type: 'await',
		content: `[5/${totalStep}] Clean output path ${output}`,
	});
	rimraf.sync(output);

	sendTip({
		type: 'pending',
		content: `[6/${totalStep}] Building...`,
	});

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
