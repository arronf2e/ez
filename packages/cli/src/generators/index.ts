import { Question } from 'inquirer';

export interface Meta {
  name: string;
  boilerplateType: string;
  description?: string;
  inquirer: Question[];
}

export type GeneratorMeta = Pick<Meta, 'boilerplateType'>;

export abstract class BasicGenerator<T> {
  abstract meta: GeneratorMeta;

  abstract prompt(): T;

  abstract build(): void;
}
