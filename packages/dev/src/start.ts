import { ChildProcess } from 'child_process';
import { EZ } from '@ez-fe/core/lib/interface';
import { Signale } from '@ez-fe/helper';

const logger = new Signale({
	interactive: true,
});

const total = 5;

export async function start(ez: EZ, devServer: ChildProcess) {
	logger.start(`Initializing development configuration...`);

	logger.await(`[1/${total}] - Getting package information...`);
	await ez.getPkg();

	logger.await(`[2/${total}] - Getting user configuration...`);
	await ez.getConfig();

	logger.await(`[3/${total}] - Getting plugin configuration...`);
	await ez.getPlugins();

	logger.await(`[4/${total}] - Getting webpack configuration...`);
	await ez.getWebpackConfig();

	logger.pending(`[5/${total}] - Starting the development server...`);

	const { config, webpackConfig } = ez;
	devServer.send({
		type: 'start',
		data: { config, webpackConfig },
	});
}
