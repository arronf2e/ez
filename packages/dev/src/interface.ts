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

export interface DevServer extends WebpackDevServer {
	sockWrite: (sockets: Sockets, type: Type, data: any) => void;
}
