import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import { info } from '@/helpers';

interface TargetPathInfo {
  generatorsDir: string;
  target: string;
}

/** 过滤非文件夹与隐藏文件 */
const filterSpecified = ({ generatorsDir, target }: TargetPathInfo) => {
  const targetPath = resolve(generatorsDir, target);
  if (statSync(targetPath).isDirectory() && !target.startsWith('.')) {
    return true;
  }

  return false;
};

/** 补充元信息 */
const addMetaInformation = async ({ generatorsDir, target }: TargetPathInfo) => {
  try {
    const targetMetaPath = resolve(generatorsDir, target, 'meta.json');
    const hasMetaData = statSync(targetMetaPath).isFile();
    if (hasMetaData) {
      const {
        default: { name, description },
      } = await import(targetMetaPath);

      return {
        name: `${name} ${info(description)}`,
        value: target,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      name: target,
      value: target,
    };
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
    console.error(e);
    return [];
  }
};
