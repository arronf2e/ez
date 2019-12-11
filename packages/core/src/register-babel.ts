import register from '@babel/register';
import { EZ } from './interface';

export const registerBabel = (ez: EZ) => {
	const { babelRegisterFiles } = ez;
	register({
		only: [(filePath: string) => babelRegisterFiles.includes(filePath)],
		cache: true,
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false,
					useBuiltIns: 'entry',
					corejs: 3,
				},
			],
			'@babel/preset-typescript',
		],
	});
};
