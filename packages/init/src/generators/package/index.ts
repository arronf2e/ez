import { BasicGenerator, Meta } from '@/generators';
import { remoteUrl } from './meta.json';

export class Generator extends BasicGenerator {
	constructor(meta: Meta) {
		super(meta);
	}

	async run() {
		await this.updateTemplate({
			remoteUrl,
		});

		this.build();
	}
}
