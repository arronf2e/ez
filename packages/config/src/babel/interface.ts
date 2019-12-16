import { Config } from '../config';

export type BaseConfig = Pick<Config, 'babelrc'> & Pick<Config, 'disableDynamicImport'>;

export type GetBabelConfig = (config: BaseConfig) => object;
