import WebpackDevServer from 'webpack-dev-server';
import { Connection } from 'sockjs';
import { BUILD_ENV } from '@ez-fe/core/lib/interface';
import { SignaleMethods } from '@ez-fe/helper';

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

export type CompilerLogType = 'Success' | 'Done' | 'Warning' | 'Error';
export interface Log {
	exec: 'log';
	data: {
		type: CompilerLogType;
		content: string;
	};
}

export type Msg = Tip | Log;

export interface CompilerLog {
	[type: string]: (content: string) => string;
}
