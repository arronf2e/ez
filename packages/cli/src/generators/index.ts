import { Question } from 'inquirer';

export interface Meta {
  name: string;
  boilerplateType: string;
  description?: string;
  inquirer: Question[];
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export abstract class Generator<T> {
  meta: GeneratorMeta;

  constructor(meta: GeneratorMeta) {
    this.meta = meta;
  }

  abstract prompt(): T;

  abstract build(): void;
}
