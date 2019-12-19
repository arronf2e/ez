import { Config } from '@ez-fe/config';

export default <Config>{
	port: 8081,
	chainConfig: webconfig => {
		return webconfig;
	},
};
