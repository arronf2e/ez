import readPkgUp from 'read-pkg-up';
export declare function getPkgInfo({ cwd }: { cwd: string }): Promise<PkgInfo> | never;
export declare type PkgInfo = readPkgUp.NormalizedReadResult['packageJson'];
