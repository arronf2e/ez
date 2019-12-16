import { Config } from '../config';

export type BaseConfig = Config & { cwd: string };

export type GetEslintConfig = (config: BaseConfig) => object;
