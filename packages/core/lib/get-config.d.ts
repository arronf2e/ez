import { Config } from './interface';
export declare function getConfigPaths({ cwd, isWin }: { cwd: string; isWin: boolean }): string[];
export declare function getUserConfig(configPaths: string[]): Promise<Partial<Config>>;
