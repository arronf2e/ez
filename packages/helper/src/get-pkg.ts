import readPkgUp from 'read-pkg-up';

export function getPkgInfo({ cwd }: { cwd: string }): PkgInfo {
  return readPkgUp.sync({ cwd }) as readPkgUp.NormalizedReadResult;
}

export type PkgInfo = readPkgUp.NormalizedReadResult;
