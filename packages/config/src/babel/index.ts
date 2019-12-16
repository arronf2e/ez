import { resolve } from 'path';
import { GetBabelConfig } from './interface';

export const getBabelConfig: GetBabelConfig = ({ babelrc, disableDynamicImport, cwd }) => {
	return {
		babelrc,
		cacheDirectory: resolve(cwd, '.cache/webpack_cache'),
		presets: [
			require.resolve('@babel/preset-react'),
			require.resolve('@babel/preset-typescript'),
			[
				require.resolve('@babel/preset-env'),
				{
					// modules: false,
					corejs: '3',
					useBuiltIns: 'usage',
				},
			],
		],
		plugins: [
			require.resolve('@babel/plugin-transform-runtime'),
			require.resolve('@babel/plugin-syntax-dynamic-import'),
			require.resolve('@babel/plugin-proposal-optional-chaining'),
			[
				require.resolve('@babel/plugin-proposal-decorators'),
				{
					legacy: true,
				},
			],
			[
				require.resolve('@babel/plugin-proposal-class-properties'),
				{
					loose: true,
				},
			],
			[
				require.resolve('babel-plugin-import'),
				{
					libraryName: 'antd',
					libraryDirectory: 'es',
					style: 'css', // `style: true` 会加载 less 文件
				},
			],
			...(disableDynamicImport ? [require.resolve('babel-plugin-dynamic-import-node')] : []),
		],
	};
};
