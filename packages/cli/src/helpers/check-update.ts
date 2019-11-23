import updateNotifier from 'update-notifier';
import readPkgUp from 'read-pkg-up';

export function checkUpdate() {
  const pkg = readPkgUp.sync();
  const notifier = updateNotifier({
    pkg: pkg?.packageJson,
    updateCheckInterval: 1000 * 60 * 10,
  });

  notifier.notify();
}
