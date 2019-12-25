import { Config } from '@ez-fe/config';

export default <Config>{
	chainConfig(webpackChainConfig) {
		webpackChainConfig.mode('development');
		webpackChainConfig.optimization.minimize(false);
	},
};
