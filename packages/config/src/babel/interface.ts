import { Config } from '../config';

export type BaseConfig = Pick<Config, 'babelrc'> &
	Pick<Config, 'disableDynamicImport'> & {
		cwd: string;
	};

export type GetBabelConfig = (config: BaseConfig) => object;
