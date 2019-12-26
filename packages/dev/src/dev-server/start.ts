import webpack from 'webpack';
import WebpackChianConfig from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import formatMessages from 'webpack-format-messages';
import address from 'address';
import Ez, { sendTip, sendLog, done, error, warning } from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { getReady } from './get-ready';
import { getDevConfig } from './webpack-config';

const intranetAddress = address.ip();

let devServer: WebpackDevServer | null;
let hasCompiled = false;

export async function startDevServer(BUILD_ENV: BUILD_ENV): Promise<WebpackDevServer> {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	await getReady(ez);

	const { config, webpackConfig } = ez;
	const { host, port, chainConfig } = config;
	const webpackDevChainConfig = getDevConfig(webpackConfig as WebpackChianConfig, { host, port });

	if (chainConfig) {
		chainConfig(webpackDevChainConfig);
	}

	const webpackDevConfig = webpackDevChainConfig.toConfig();

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