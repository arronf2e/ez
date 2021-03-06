import webpack from 'webpack';
import WebpackChianConfig from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import formatMessages from 'webpack-format-messages';
import address from 'address';
import Ez, { done, error, warning } from '@ez-fe/core';
import { em } from '@ez-fe/helper';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { getReady } from './get-ready';
import { getDevConfig } from './webpack-config';
import { log, tip } from './message';

const intranetAddress = address.ip();

let devServer: WebpackDevServer | null;
let hasCompiled = false;

export async function startDevServer(BUILD_ENV: BUILD_ENV): Promise<WebpackDevServer> {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	await getReady(ez);

	ez.registerFileMonitor({
		add,
		change,
	});

	const { cwd, config, webpackChainConfig } = ez;
	const { host, port, themeColors = {}, chainConfig } = config;
	const webpackDevChainConfig = getDevConfig(webpackChainConfig as WebpackChianConfig, {
		cwd,
		host,
		port,
		themeColors,
	});

	if (chainConfig) {
		chainConfig(webpackDevChainConfig);
	}

	const webpackDevConfig = webpackDevChainConfig.toConfig();

	const compiler = webpack(webpackDevConfig);

	compiler.hooks.invalid.tap('invalid', function() {
		return log('info', 'Compiling...');
	});

	compiler.hooks.done.tap('ez done', stats => {
		const messages = formatMessages(stats);

		if (!messages.errors.length && !messages.warnings.length && hasCompiled) {
			const { startTime = 0, endTime = 0 } = stats;
			hasCompiled = true;

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
			return tip('error', err.message);
		}

		log('clear');

		log('address', {
			intranetAddress,
			host,
			port,
		});

		log('notice', `Some additionnal notes to be displayed unpon successful compilation!`);
	});

	return devServer;
}

function restart(why: string) {
	if (hasCompiled) {
		if (process.send) {
			process.send({
				exec: 'restart',
				data: {
					type: 'info',
					content: `Since ${why}, try to restart the server`,
				},
			});
		}
	}
}

function add(fileName: string) {
	restart(`new configuration file (${em(fileName.split('/').pop())}) added`);
}

function change(fileName: string) {
	restart(`configuration file (${em(fileName.split('/').pop())}) changed`);
}
