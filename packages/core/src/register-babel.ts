import register from '@babel/register';
import { EZ } from './interface';

export const registerBabel = (ez: EZ) => {
	const { babelRegisterFiles } = ez;
	register({
		only: [(fileName: string) => babelRegisterFiles.includes(fileName)],
		extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
		babelrc: false,
		cache: false,
		ignore: [/node_modules/],
		presets: [
			[
				require.resolve('@babel/preset-env'),
				{
					useBuiltIns: 'entry',
					corejs: 3,
				},
			],
			require.resolve('@babel/preset-typescript'),
		],
	});
};
