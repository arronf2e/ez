import { satisfies } from 'semver';
import { message } from './message';

/**
 * 检查 Node 版本
 */
export const checkVersion = () => {
  if (!satisfies(process.version, '>= 8.0.0')) {
    message.error('Only work with Node v8.0.0 and up!');
    process.exit(1);
  }
};
