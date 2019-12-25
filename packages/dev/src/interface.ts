import WebpackChainConfig from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import { Connection } from 'sockjs';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { SignaleMethods } from '@ez-fe/helper';

export type GetDevConfig = (
	webpackChainConfig: WebpackChainConfig,
	{ host, port }: { host: string; port: number }
) => WebpackChainConfig;

export type Sockets = Connection[];

export type Type =
	| 'still-ok'
	| 'hash'
	| 'errors'
	| 'warnings'
	| 'content-changed'
	| 'progress-update'
	| 'invalid'
	| 'log-level'
	| 'hot'
	| 'liveReload'
	| 'progress'
	| 'overlay';

export type Signals = 'SIGINT' | 'SIGTERM';

export interface DevServer extends WebpackDevServer {
	sockets: Sockets;
	sockWrite: (sockets: Sockets, type: Type, data?: any) => void;
}

export interface Start {
	exec: 'start';
	data: BUILD_ENV;
}

export interface Close {
	exec: 'close';
	data: null;
}

export interface Tip {
	exec: 'tip';
	data: {
		type: SignaleMethods;
		content: string;
	};
}

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
