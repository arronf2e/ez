import { Config } from '@ez-fe/config';

export type BaseConfig = Pick<Config, 'babelrc'> &
	Pick<Config, 'disableDynamicImport'> &
	Pick<Config, 'themeColors'> &
	Pick<Config, 'treeShaking'> & {
		cwd: string;
	};

export type GetBabelConfig = (config: BaseConfig) => object;
