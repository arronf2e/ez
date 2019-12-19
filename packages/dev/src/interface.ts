import WebpackDevServer from 'webpack-dev-server';
import { Connection } from 'sockjs';
import { SignaleMethods } from '@ez-fe/helper';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';

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

export type MsgOperationType = 'log' | 'exec';

export interface StartData {
	loggerMethod?: SignaleMethods;
	message?: string;
	step?: number;
	target?: BUILD_ENV;
}

export interface Start {
	type: 'start';
	operationType: MsgOperationType;
	data?: StartData;
}

export interface ReStartingData {
	why: string;
}

export interface ReStarting {
	type: 'restarting';
	operationType: MsgOperationType;
	data: ReStartingData;
}

export interface SuccessData {}

export interface Success {
	type: 'success';
	operationType: MsgOperationType;
	data: SuccessData;
}

export interface ErrorData {
	error: string;
}

export interface Error {
	type: 'error';
	operationType: MsgOperationType;
	data: ErrorData;
}

export type Msg = Start | ReStarting | Success | Error;
