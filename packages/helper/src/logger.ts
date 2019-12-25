import { cyan } from 'chalk';

export const logger = {
	clear: () => {
		console.clear();
	},
	info: (content: string) => {
		console.log(cyan.bgGreen.black(' I '), content);
	},
	success: (content: string) => {
		console.log(cyan.bgCyan.black(' Success '), content);
	},
	done: (content: string) => {
		console.log(cyan.bgBlue.black(' Done '), content);
	},
	notice: (content: string) => {
		console.log(cyan.bgWhite.black(' N '), content);
	},
	warning: (content: string) => {
		console.log(cyan.bgYellow.black(' Warning '), content);
	},
	error: (content: string) => {
		console.log(cyan.bgRedBright.black(' Error '), content);
	},
	address: ({ host, port, intranetAddress }: { host: string; port: number; intranetAddress: string }) => {
		console.log(
			cyan.bgGreen.black(' I '),
			host === '0.0.0.0'
				? `App running at: \n
          - Local: ${cyan(`http://localhost:${port}`)}\n
          - Network: ${cyan(`http://${intranetAddress}:${port}`)} \n`
				: `App running at: \n
          - Local: ${cyan(`http://localhost:${port}`)}\n`
		);
	},
};
