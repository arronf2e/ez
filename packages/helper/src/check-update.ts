import updateNotifier from 'update-notifier';
import readPkgUp from 'read-pkg-up';

export function checkUpdate(cwd: string) {
  const pkg = readPkgUp.sync({ cwd });
  const notifier = updateNotifier({
    pkg: pkg?.packageJson,
    updateCheckInterval: 0,
  });

  notifier.notify();
}
