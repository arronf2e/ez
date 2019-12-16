import { Config } from './interface';

export const config = <Config>{
	host: '0.0.0.0',
	port: 12138,
	publicPath: '/',
	outputPath: 'dist',
	babel: false,
	disableDynamicImport: false,
};

export * from './interface';
