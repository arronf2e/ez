import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';
import { Msg, StartData } from './interface';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';

const send = (msg: Msg) => {
	if (process && process.send) {
		process.send(msg);
	}
};

let started = false;

/** 未启动过 */
if (!started) {
	send({
		type: 'start',
		operationType: 'exec',
	});

	started = true;
}

process.on('message', ({ type, operationType, data }: Msg) => {
	if (type === 'start' && operationType === 'exec') {
		const { target } = <StartData>data;
		startDevServer(target as BUILD_ENV);
	}
});

async function startDevServer(BUILD_ENV: BUILD_ENV) {
	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV,
	});

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'start',
			message: 'Initializing development configuration...',
		},
	});

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'await',
			step: 1,
			message: 'Getting package information...',
		},
	});

	await ez.getPkg();

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'await',
			step: 2,
			message: 'Getting user configuration...',
		},
	});

	await ez.getConfig();

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'await',
			step: 3,
			message: 'Getting plugin configuration...',
		},
	});
	await ez.getPlugins();

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'await',
			step: 4,
			message: 'Getting webpack configuration...',
		},
	});
	await ez.getWebpackConfig();

	send({
		type: 'start',
		operationType: 'log',
		data: {
			loggerMethod: 'pending',
			step: 5,
			message: 'Starting the development server...',
		},
	});

	const { config, webpackConfig } = ez;
	const { host, port } = config;
	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, {
		host,
		port,
		public: `localhost:${port}`,
		open: false,
		hot: true,
		quiet: true,
		overlay: {
			warnings: true,
			errors: true,
		},
		historyApiFallback: true,
		clientLogLevel: 'warning',
	});

	server.listen(port, host, err => {
		console.log('Starting the development server...\n');
	});
}
