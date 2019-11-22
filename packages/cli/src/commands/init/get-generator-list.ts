import { resolve } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import { info, message } from '@/helpers';

interface TargetPathInfo {
  generatorsDir: string;
  target: string;
}

/** 过滤非文件夹与隐藏文件 */
const filterSpecified = ({ generatorsDir, target }: TargetPathInfo) => {
  const targetPath = resolve(generatorsDir, target);
  if (existsSync(targetPath) && statSync(targetPath).isDirectory() && !target.startsWith('.')) {
    return true;
  }

  return false;
};

/** 补充元信息 */
const addMetaInformation = async ({ generatorsDir, target }: TargetPathInfo) => {
  const targetMetaPath = resolve(generatorsDir, target, 'meta.json');

  if (existsSync(targetMetaPath)) {
    const hasMetaData = statSync(targetMetaPath).isFile();
    if (hasMetaData) {
      const { name, description } = await import(targetMetaPath);

      return {
        name: `${name} ${info(description)}`,
        value: target,
      };
    }
  }

  return {
    name: target,
    value: target,
  };
};

export const getGeneratorList = async () => {
  try {
    const generatorsDir = resolve(__dirname, '..', '..', 'generators');
    return await Promise.all(
      readdirSync(generatorsDir)
        .filter(target => filterSpecified({ generatorsDir, target }))
        .map(async target => await addMetaInformation({ generatorsDir, target }))
    );
  } catch (e) {
    message.error(e);
    process.exit(-1);
  }
};
