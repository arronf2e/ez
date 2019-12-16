import assert from 'assert';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Ez from '@ez-fe/core';

export async function dev() {
	const ez = new Ez({ NODE_ENV: 'development' });

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
