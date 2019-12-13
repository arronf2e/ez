import WebpackChainConfig from 'webpack-chain';

interface BaseConfig {
	sourcePath: string;
	publicPath: string;
}

interface DevConfig extends BaseConfig {}

interface BuildConfig extends BaseConfig {}

export type GetBaseConfig = (config: BaseConfig) => WebpackChainConfig;

export type GetDevConfig = (config: DevConfig) => WebpackChainConfig;

export type GetBuildConfig = (config: BuildConfig) => WebpackChainConfig;
