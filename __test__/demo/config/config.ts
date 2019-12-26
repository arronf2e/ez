import { Config } from '@ez-fe/config';

export default <Config>{
	port: 12138,
	chainConfig(webpackChainConfig) {
		webpackChainConfig.mode('development');
		webpackChainConfig.optimization.minimize(false);
	},
};
