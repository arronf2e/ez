import WebpackDevServer from 'webpack-dev-server';
import { Connection } from 'sockjs';

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

export type MsgType = 'starting' | 'restarting' | 'success' | 'error';

export interface StartingData {
	name: string;
	step: number;
}

export interface Starting {
	type: 'starting';
	data: StartingData;
}

export interface ReStartingData {
	why: string;
}

export interface ReStarting {
	type: 'restarting';
	data: ReStartingData;
}

export interface SuccessData {
	why: string;
}

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

export type Msg = Starting | ReStarting | Success | Error;
