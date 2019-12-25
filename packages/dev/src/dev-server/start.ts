import webpack from 'webpack';
import WebpackChianConfig from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import formatMessages from 'webpack-format-messages';
import address from 'address';

import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { getDevConfig } from './webpack-config';
import { sendTip, sendLog } from '../message';
import { done } from './done';
import { error } from './error';
import { warning } from './warning';

const totalStep = 5;
const intranetAddress = address.ip();

let devServer: WebpackDevServer | null;
let hasCompiled = false;

export async function startDevServer(BUILD_ENV: BUILD_ENV): Promise<WebpackDevServer> {
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

	/** 启动开发服务 */
	sendTip({
		type: 'pending',
		content: `[5/${totalStep}] Starting the development server...`,
	});

	const { config, webpackConfig } = ez;
	const { host, port } = config;
	const webpackDevConfig = getDevConfig(webpackConfig as WebpackChianConfig, { host, port });

	const compiler = webpack(webpackDevConfig);

	compiler.hooks.done.tap('ez done', stats => {
		const messages = formatMessages(stats);

		if (!messages.errors.length && !messages.warnings.length && hasCompiled) {
			const { startTime = 0, endTime = 0 } = stats;
			return done(endTime - startTime);
		}

		if (messages.errors.length) {
			return error(messages.errors);
		}

		if (messages.warnings.length) {
			return warning(messages.warnings);
		}

		hasCompiled = true;
	});

	devServer = new WebpackDevServer(compiler, webpackDevConfig.devServer);

	devServer.listen(port, host, err => {
		if (err) {
			return sendTip({
				type: 'error',
				content: err.message,
			});
		}

		sendLog({
			type: 'clear',
		});

		sendLog({
			type: 'address',
			content: {
				intranetAddress,
				host,
				port,
			},
		});

		sendLog({
			type: 'notice',
			content: `Some additionnal notes to be displayed unpon successful compilation!`,
		});
	});

	return devServer;
}
