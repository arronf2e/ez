import { Configuration } from 'webpack';
import WebpackChainConfig from 'webpack-chain';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { SignaleMethods } from '@ez-fe/helper';

export type GetBuildConfig = (
	webpackChainConfig: WebpackChainConfig,
	{ host, port }: { host: string; port: number }
) => Configuration;

export interface Start {
	exec: 'start';
	data: BUILD_ENV;
}

export interface Tip {
	exec: 'tip';
	data: {
		type: SignaleMethods;
		content: string;
	};
}

export type Signals = 'SIGINT' | 'SIGTERM';

export type CompilerLogType =
	/** 输出地址 */
	| 'address'
	/** 清空控制台 */
	| 'clear'
	| 'info'
	| 'success'
	| 'done'
	| 'warning'
	| 'error'
	| 'done'
	| 'notice';

export interface Log {
	exec: 'log';
	data: {
		type: CompilerLogType;
		content?: string | object;
	};
}

export type Msg = Tip | Log;

export interface CompilerLog {
	[type: string]: (content: string) => string;
}
