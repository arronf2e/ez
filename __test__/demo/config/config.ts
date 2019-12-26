import { Config } from '@ez-fe/config';

export default <Config>{
	port: 9001,
	chainConfig(webpackChainConfig) {
		webpackChainConfig.mode('development');
		webpackChainConfig.optimization.minimize(false);
	},
};
