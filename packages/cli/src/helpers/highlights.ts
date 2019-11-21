import { cyan, gray, red, yellow, green } from 'chalk';

/** 成功文本 */
export const success = green.bold;

/** 警告文本 */
export const warning = yellow.bold;

/** 信息文本 */
export const info = gray.underline;

/** 错误文本 */
export const error = red.bold;

/** 文本强调标识 */
export const em = cyan.bold.italic;
