import assert from 'assert';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { Arguments } from 'yargs';

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
