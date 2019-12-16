import { resolve } from 'path';
import { GetEslintConfig } from './interface';

export const getEslintConfig: GetEslintConfig = ({ cwd }) => {
	return {
		cache: resolve(cwd, '.cache/eslint_cache'),
		eslintPath: require.resolve('eslint'),
		env: {
			browser: true,
			es6: true,
			node: true,
		},
		extends: ['airbnb', 'prettier', 'prettier/@typescript-eslint'],
		globals: [],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			ecmaVersion: 2018,
			sourceType: 'module',
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		plugins: ['import', 'react', '@typescript-eslint', 'react-hooks', 'prettier'],
	};
};
