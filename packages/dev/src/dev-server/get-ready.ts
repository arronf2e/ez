import EZ, { sendTip } from '@ez-fe/core';

const totalStep = 5;

export async function getReady(ez: EZ) {
	/** 获取包信息 */
	sendTip({
		type: 'await',
		content: `[1/${totalStep}] Getting package information...`,
	});
	await ez.getPkg();

	/** 获取用户配置 */
	sendTip({
		type: 'await',
		content: `[2/${totalStep}] Getting user configuration...`,
	});
	await ez.getConfig();

	/** 获取用户配置 */
	sendTip({
		type: 'await',
		content: `[3/${totalStep}] Getting plugin configuration...`,
	});
	await ez.getPlugins();

	/** 获取 webpack 公用配置 */
	sendTip({
		type: 'await',
		content: `[4/${totalStep}] Getting webpack configuration...`,
	});
	await ez.getWebpackConfig();

	/** 启动开发服务 */
	sendTip({
		type: 'pending',
		content: `[5/${totalStep}] Starting the development server...`,
	});
}
