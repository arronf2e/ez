export interface Meta {
  name: string;
  description?: string;
  boilerplateType: string;
}
export declare type GeneratorMeta = Pick<Meta, 'boilerplateType'>;
export interface Generator {
  meta: GeneratorMeta;
  templatePath: string;
  queryFeatures(): object;
  updateTemplate({ templatePath, remoteUrl }: { templatePath: string; remoteUrl: string }): void;
  run(): void;
}
export declare abstract class BasicGenerator implements Generator {
  meta: GeneratorMeta;
  templatePath: string;
  constructor(meta: GeneratorMeta);
  updateTemplate({ remoteUrl }: { remoteUrl: string }): Promise<void>;
  queryFeatures(): Promise<object>;
  render(): Promise<void>;
  abstract run(): void;
}
