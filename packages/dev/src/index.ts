import assert from 'assert';
import { Arguments } from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { message } from '@ez-fe/helper';
import { DevServer, Signals } from './interface';

export async function dev(argv: Arguments) {
	const { target } = argv;

	assert(target, 'target is error.');

	const ez = new Ez({
		NODE_ENV: 'development',
		BUILD_ENV: target as BUILD_ENV,
	});

	await ez.init();

	const {
		webpackConfig,
		config: { port, host },
	} = ez;

	assert(webpackConfig, 'webpackConfig is error.');

	const compiler = webpack(webpackConfig);

	const devServer = new WebpackDevServer(compiler, {
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
	}) as DevServer;

	devServer.listen(port, host, (err: any) => {
		if (err) {
			message.error(err);
		}

		message.start('Starting the development server...\n');
	});

	[/** <Ctrl>+C */ 'SIGINT', 'SIGTERM'].forEach(signal => {
		process.on(signal as Signals, () => {
			devServer.close(() => {
				process.exit(0);
			});
		});
	});

	const restart = (reason: string) => {
		if (reason) {
			message.pending(reason);
		} else {
			message.pending('Try to restart server...');
		}
		devServer.close();

		dev(argv);
	};

	// setInterval(() => {
	// 	message.info('reload');
	// 	devServer.sockWrite(devServer.sockets, 'content-changed');
	// }, 3000);
}
