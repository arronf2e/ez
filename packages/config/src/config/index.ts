import { Config } from './interface';

export const config = <Config>{
	alias: {},
	babelrc: false,
	define: {},
	disableDynamicImport: false,
	eslintrc: false,
	hash: false,
	htmlMinify: true,
	host: '0.0.0.0',
	name: 'react-admin',
	outputPath: './dist',
	port: 12138,
	publicPath: '/',
	treeShaking: false,
};

export * from './interface';
