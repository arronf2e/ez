import { satisfies } from 'semver';
import logSymbols from 'log-symbols';
import { error } from './highlights';

/**
 * Satisfies check version
 */
export const checkVersion = () => {
  if (!satisfies(process.version, '>= 8.0.0')) {
    console.error(
      logSymbols.error,
      error('Only work with Node v8.0.0 and up!')
    );
    process.exit(1);
  }
};
