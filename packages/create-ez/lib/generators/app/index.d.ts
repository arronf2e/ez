import { BasicGenerator, GeneratorMeta } from '@/generators';
export declare class Generator extends BasicGenerator {
  constructor(meta: GeneratorMeta);
  run(): Promise<void>;
}
