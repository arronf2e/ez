import { Config } from './interface';

export const config = <Config>{
	name: 'react-admin',
	host: '0.0.0.0',
	port: 12138,
	publicPath: '/',
	outputPath: 'dist',
	babelrc: false,
	eslintrc: false,
	disableDynamicImport: false,
};

export * from './interface';
