import { resolve } from 'path';
import { readdirSync } from 'fs';

export const getGeneratorList = () => {
  return readdirSync(resolve(__dirname, '..', '..', 'templates'))
    .filter(target => !target.startsWith('.'))
    .map(target => ({ name: target, value: target }));
};
