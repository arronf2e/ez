import { Config } from './interface';

export const config = <Config>{
	alias: {},
	babelrc: false,
	chainConfig: () => {},
	define: {},
	devtool: false,
	disableDynamicImport: false,
	eslintrc: false,
	hash: false,
	htmlMinify: true,
	host: '0.0.0.0',
	name: 'react-admin',
	minimize: true,
	outputPath: 'dist',
	port: 12138,
	publicPath: '/',
	runtimeChunk: false,
	treeShaking: false,
	themeColors: {},
};

export * from './interface';
