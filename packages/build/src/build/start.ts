import { resolve } from 'path';
import webpack from 'webpack';

import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { message } from '@ez-fe/helper';
import { sendTip, sendLog } from './message';

const totalStep = 5;

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
		config: { outputPath, publicPath, chainConfig },
	} = ez;

	if (!webpackConfig) {
		return message.error('webpack build config error!');
	}

	/** 模式(mode) */
	webpackConfig.mode('production');

	/** SourceMap(devtool) */
	webpackConfig.devtool('source-map');

	/** 输出(output) */
	const output = resolve(cwd, outputPath as string);
	webpackConfig.output
		.path(output)
		.filename('js/[chunkhash:8].js')
		.publicPath(publicPath as string);

	/** 统计信息(stats) */
	webpackConfig.stats('none');

	if (chainConfig) {
		chainConfig(webpackConfig);
	}

	const webpackBuildConfig = webpackConfig.toConfig();

	webpack(webpackBuildConfig, (err, stats) => {
		if (err) {
			sendLog({
				type: 'error',
				content: err.message,
			});
		} else {
			const { startTime = 0, endTime = 0 } = stats;
			sendLog({
				type: 'clear',
			});
			sendLog({
				type: 'success',
				content: `Compiled successfully in ${endTime - startTime} ms`,
			});
		}

		process.exit(0);
	});
}
