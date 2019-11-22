import { dynamicImport, message } from '@/helpers';
import { Generator } from '@/generators';

interface TemplateGenerator extends Generator {
  new (meta: { boilerplateType: string }): TemplateGenerator;
}

export async function getGenerator(boilerplateType: string): Promise<Generator | never> {
  try {
    const { Generator } = await dynamicImport<{ Generator: TemplateGenerator }>(`@/generators/${boilerplateType}`);
    return new Generator({ boilerplateType });
  } catch (e) {
    message.error(e);
    process.exit(-1);
  }
}
