import { Config } from '@ez-fe/config';

export default <Config>{
	name: '测试项目',
	port: 9527,
	chainConfig: webpackChainConfig => {
		return webpackChainConfig;
	},
};
