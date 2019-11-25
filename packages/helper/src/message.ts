import Symbols from 'log-symbols';
import { error, info, success, warning } from './highlights';

export const message = {
  success: (msg: string) => console.log(Symbols.success, success(msg)),
  info: (msg: string) => console.log(Symbols.info, info(msg)),
  warning: (msg: string) => console.log(Symbols.info, warning(msg)),
  error: (msg: string) => console.log(Symbols.error, error(msg)),
};
