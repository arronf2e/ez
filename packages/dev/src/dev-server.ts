import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { parse } from '@ez-fe/helper';
import { Msg, StartData } from './interface';

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
	});

	started = true;
}

process.on('message', ({ type, data }: Msg) => {
	if (type === 'start') {
		startDevServer(<StartData>parse(data as string));
	}
});

function startDevServer({ config, webpackConfig }: StartData) {
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
