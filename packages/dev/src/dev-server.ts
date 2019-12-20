import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { sendLog } from './logger';
import { Start, Close } from './interface';

const totalStep = 5;

let devServer: WebpackDevServer | null;

process.on('message', (msg: Start | Close) => {
	const { exec, data } = msg;
	if (exec === 'start') {
		startDevServer(data as BUILD_ENV);
	}

	if (exec === 'close' && devServer) {
		devServer.close();
		devServer = null;
	}
});

async function startDevServer(BUILD_ENV: BUILD_ENV) {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	sendLog({
		type: 'await',
		content: `[1/${totalStep}] Getting package information...`,
	});

	await ez.getPkg();

	sendLog({
		type: 'await',
		content: `[2/${totalStep}] Getting user configuration...`,
	});
	await ez.getConfig();

	sendLog({
		type: 'await',
		content: `[3/${totalStep}] Getting plugin configuration...`,
	});
	await ez.getPlugins();

	sendLog({
		type: 'await',
		content: `[4/${totalStep}] Getting webpack configuration...`,
	});
	await ez.getWebpackConfig();

	sendLog({
		type: 'pending',
		content: `[5/${totalStep}] Starting the development server...`,
	});

	const { config, webpackConfig } = ez;
	const { host, port } = config;
	const compiler = webpack(webpackConfig);
	devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

	devServer.listen(port, host, err => {
		if (err) {
			return sendLog({
				type: 'error',
				content: err.message,
			});
		}

		sendLog({
			type: 'success',
			content: `Server is running at localhost:${port}`,
		});
	});
}
