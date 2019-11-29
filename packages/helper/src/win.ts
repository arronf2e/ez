import slash from 'slash';

export function isWin() {
  return process.platform.includes('win');
}

export function formatWinPath(path: string) {
  return slash(path);
}
