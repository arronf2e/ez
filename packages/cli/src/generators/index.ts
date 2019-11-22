import { Question } from 'inquirer';

export interface Meta {
  name: string;
  boilerplateType: string;
  description?: string;
  inquirer: Question[];
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export interface Generator {
  meta: GeneratorMeta;
  prompt(): any;
  build(): void;
}

export abstract class BasicGenerator<T> implements Generator {
  abstract meta: GeneratorMeta;

  abstract prompt(): T;

  abstract build(): void;
}
