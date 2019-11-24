import updateNotifier from 'update-notifier';
import readPkgUp from 'read-pkg-up';

export function checkUpdate() {
  const pkg = readPkgUp.sync();
  const notifier = updateNotifier({
    pkg: pkg?.packageJson,
    updateCheckInterval: 0,
  });

  notifier.notify();
}
