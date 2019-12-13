import { resolve } from 'path';
import Config from 'webpack-chain';
import { GetBaseConfig } from './interface';

export const getBaseConfig: GetBaseConfig = config => {
	const { sourcePath, publicPath } = config;
	const webpackConfig = new Config();

	/** 入口文件 */
	const entry = resolve(sourcePath, 'index.tsx');
	webpackConfig.entry('main').add(entry);

	/** 资源前缀 */
	webpackConfig.output.path(resolve(sourcePath, '..', 'dist')).publicPath(publicPath);

	return webpackConfig;
};
