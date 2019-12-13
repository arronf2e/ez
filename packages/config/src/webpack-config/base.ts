import { resolve } from 'path';
import Config from 'webpack-chain';
import { GetBaseConfig } from './interface';

export const getBaseConfig: GetBaseConfig = config => {
	const { sourcePath } = config;
	const webpackConfig = new Config();

	/** 入口文件 */
	const entry = resolve(sourcePath, 'index.tsx');
	webpackConfig.entry('main').add(entry);

	return webpackConfig;
};
