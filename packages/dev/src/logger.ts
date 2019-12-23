import { cyan } from 'chalk';
import address from 'address';

const intranetAddress = address.ip();

export default {
	Success: (port: string) => {
		console.log(`App running at: \n
          - Local: ${cyan(`http://localhost:${port}`)}\n
          - Network: ${cyan(`http://${intranetAddress}:${port}`)} \n`);
	},
	Error: (content: string) => void 0,
	Warning: (content: string) => void 0,
	Done: (content: string) => void 0,
};
