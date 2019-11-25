import { resolve } from 'path';
import updateNotifier from 'update-notifier';
import readPkgUp from 'read-pkg-up';

export function checkUpdate() {
  const pkg = readPkgUp.sync({ cwd: resolve(__dirname, '..', '..') });
  const notifier = updateNotifier({
    pkg: pkg?.packageJson,
    updateCheckInterval: 0,
  });

  notifier.notify();
}
