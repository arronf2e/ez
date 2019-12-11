import { BasicGenerator, Meta } from '@/generators';
export declare class Generator extends BasicGenerator {
	constructor(meta: Meta);
	run(): Promise<void>;
}
