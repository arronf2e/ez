import { sendTip, sendLog } from '@ez-fe/core';
import { SignaleMethods } from '@ez-fe/helper';

export function tip(type: SignaleMethods, content: string) {
	sendTip({
		type,
		content,
	});
}

export function log(type: any, content?: any) {
	sendLog({
		type,
		content,
	});
}
