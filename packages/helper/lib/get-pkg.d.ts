import readPkgUp from 'read-pkg-up';
export declare function getPkgInfo({ cwd }: { cwd: string }): PkgInfo;
export declare type PkgInfo = readPkgUp.NormalizedReadResult;
