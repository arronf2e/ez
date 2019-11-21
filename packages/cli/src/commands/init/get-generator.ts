import { dynamicImport, message } from '@/helpers';

export async function getGenerator(boilerplateType: string) {
  try {
    const { Generator } = await dynamicImport<{ Generator: any }>(`@/generators/${boilerplateType}`);
    return new Generator({ boilerplateType });
  } catch (e) {
    message.error(e);
  }
}
