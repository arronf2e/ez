import { start } from './start';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { Start } from '../interface';

process.on('message', async (msg: Start) => {
	const { exec, data } = msg;
	if (exec === 'start') {
		await start(data as BUILD_ENV);
	}
});
