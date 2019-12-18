import assert from 'assert';
import { Arguments } from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { message } from '@ez-fe/helper';

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
	});

	devServer.listen(port, host, (err: any) => {
		console.log('Starting the development server...\n');
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

	setInterval(() => {
		message.info('reload');
		devServer.sockWrite(devServer.sockets, 'content-changed');
	}, 3000);

	if (false) {
		restart('hahah');
	}
}
