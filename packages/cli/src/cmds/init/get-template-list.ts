import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import { info } from '../../helper';

export const getTamplateList = async () => {
  try {
    const templatesPath = resolve(__dirname, '..', '..', '..', 'templates');
    return await Promise.all(
      readdirSync(templatesPath)
        .filter(target => !target.startsWith('.'))
        .map(async target => {
          try {
            const targetMetaPath = resolve(templatesPath, target, 'meta.json');
            const hasMetaData = statSync(targetMetaPath).isFile();

            if (hasMetaData) {
              const { default: metaData } = await import(targetMetaPath);
              return {
                name: `${metaData.name} ${info(metaData.description)}`,
                value: target,
              };
            }
          } catch (e) {
            return {
              name: target,
              value: target,
            };
          }

          return {
            name: target,
            value: target,
          };
        })
    );
  } catch (e) {
    return [];
  }
};
