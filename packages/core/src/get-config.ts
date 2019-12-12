import { join } from 'path';
import { existsSync } from 'fs';
import createDebug from 'debug';
import extend from 'extend';
import { Config } from '@ez-fe/config';
import { formatWinPath, message, dynamicImport, em } from '@ez-fe/helper';
import { EZ } from './interface';

const debug = createDebug('ez:core');

export function getConfigPaths({ cwd, isWin }: { cwd: string; isWin: boolean }) {
	const configs = ['config/config.ts'];
	let configPaths = configs.map(config => join(cwd, config));

	configPaths = isWin ? configPaths.map(formatWinPath) : configPaths;

	debug(`configPaths: ${configPaths}`);

	return configPaths;
}

async function getConfig(configPath: string) {
	let config = {};
	if (!existsSync(configPath)) {
		message.error(`No basic configuration(${em(configPath)}) found!`);
		process.exit(-1);
	}

	config = await dynamicImport(configPath);

	return config;
}

export async function getUserConfig(ez: EZ): Promise<Partial<Config>> {
	const { cwd, isWin, config: baseConfig } = ez;
	const configPaths = getConfigPaths({ cwd, isWin });
	const configs = await Promise.all(configPaths.map(async configPath => await getConfig(configPath)));

	return configs.reduce((baseConfig, config) => {
		return extend(true, baseConfig, config);
	}, baseConfig);
}

export async function getWebpackConfig() {}
