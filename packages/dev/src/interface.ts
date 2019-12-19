import { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Connection } from 'sockjs';
import { Config } from '@ez-fe/config';

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

export type Signals =
	| 'SIGABRT'
	| 'SIGALRM'
	| 'SIGBUS'
	| 'SIGCHLD'
	| 'SIGCONT'
	| 'SIGFPE'
	| 'SIGHUP'
	| 'SIGILL'
	| 'SIGINT'
	| 'SIGIO'
	| 'SIGIOT'
	| 'SIGKILL'
	| 'SIGPIPE'
	| 'SIGPOLL'
	| 'SIGPROF'
	| 'SIGPWR'
	| 'SIGQUIT'
	| 'SIGSEGV'
	| 'SIGSTKFLT'
	| 'SIGSTOP'
	| 'SIGSYS'
	| 'SIGTERM'
	| 'SIGTRAP'
	| 'SIGTSTP'
	| 'SIGTTIN'
	| 'SIGTTOU'
	| 'SIGUNUSED'
	| 'SIGURG'
	| 'SIGUSR1'
	| 'SIGUSR2'
	| 'SIGVTALRM'
	| 'SIGWINCH'
	| 'SIGXCPU'
	| 'SIGXFSZ'
	| 'SIGBREAK'
	| 'SIGLOST'
	| 'SIGINFO';

export interface DevServer extends WebpackDevServer {
	sockets: Sockets;
	sockWrite: (sockets: Sockets, type: Type, data?: any) => void;
}

export type MsgType = 'start' | 'restarting' | 'success' | 'error';

export interface StartData {
	webpackConfig: Configuration;
	config: Config;
}

export interface Start {
	type: 'start';
	data?: string;
}

export interface ReStartingData {
	why: string;
}

export interface ReStarting {
	type: 'restarting';
	data: ReStartingData;
}

export interface SuccessData {}

export interface Success {
	type: 'success';
	data: SuccessData;
}

export interface ErrorData {
	error: string;
}

export interface Error {
	type: 'error';
	data: ErrorData;
}

export type Msg = Start | ReStarting | Success | Error;
