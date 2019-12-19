import { ChildProcess } from 'child_process';
import { Signale } from '@ez-fe/helper';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { Msg, StartData } from './interface';

const logger = new Signale({
	interactive: true,
});

const total = 5;

export async function start({ type, operationType, data }: Msg, target: BUILD_ENV, devServer: ChildProcess) {
	/** 首次 */
	if (operationType === 'exec') {
		devServer.send({
			type: 'start',
			operationType,
			data: {
				target,
			},
		});
	}

	if (operationType === 'log') {
		const { loggerMethod = 'log', message, step } = <StartData>data;
		if (step) {
			logger[loggerMethod](`[${step}/${total}] - ${message}`);
		} else {
			logger[loggerMethod](message);
		}
	}
}
