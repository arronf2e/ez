import WebpackChainConfig from 'webpack-chain';
import { Config } from '@ez-fe/config';

interface BaseConfig extends Required<Config> {
	/** 当前工作路径 */
	cwd: string;
	/** 源码地址 */
	sourcePath: string;
	/** BUILD_ENV */
	BUILD_ENV: string;
	/** NODE_ENV */
	NODE_ENV: string;
	/** treeShaking */
	treeShaking: boolean;
}

interface DevConfig extends BaseConfig {}

interface BuildConfig extends BaseConfig {}

export type GetBaseConfig = (config: BaseConfig) => WebpackChainConfig;

export type GetDevConfig = (config: DevConfig) => WebpackChainConfig;

export type GetBuildConfig = (config: BuildConfig) => WebpackChainConfig;
