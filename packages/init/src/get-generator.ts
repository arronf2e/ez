import { dynamicImport, message } from '@ez-fe/helper';
import { Generator, Meta } from '@/generators';

interface TemplateGenerator extends Generator {
	new (meta: Meta): TemplateGenerator;
}

export async function getGenerator(meta: Meta): Promise<Generator | never> {
	try {
		const { boilerplateType } = meta;
		const { Generator } = await dynamicImport<{ Generator: TemplateGenerator }>(`@/generators/${boilerplateType}`);
		return new Generator(meta);
	} catch (e) {
		message.error('Generator not found!');
		throw e;
	}
}
