import WebpackDevServer from 'webpack-dev-server';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { Start, Close } from '../interface';
import { startDevServer } from './start';

let devServer: WebpackDevServer | null;

process.on('message', async (msg: Start | Close) => {
	const { exec, data } = msg;
	if (exec === 'start') {
		devServer = await startDevServer(data as BUILD_ENV);
	}

	if (exec === 'close' && devServer) {
		devServer.close();
		devServer = null;
	}
});
