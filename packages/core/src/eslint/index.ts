import { GetEslintConfig } from './interface';

export const getEslintConfig: GetEslintConfig = ({ cwd }) => {
	return {
		baseConfig: {
			extends: [require.resolve('eslint-config-react-app')],
		},
		ignore: false,
		eslintPath: require.resolve('eslint'),
		useEslintrc: false,
		settings: {
			react: {
				version: '16.9.17',
			},
		},
	};
};
