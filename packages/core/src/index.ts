import createDebug from 'debug';

const ezDebug = createDebug('ez');

export default class Ez {
  protected cwd: string;

  constructor() {
    const { cwd } = process;
    this.cwd = cwd();
    ezDebug(1234);
  }
}
