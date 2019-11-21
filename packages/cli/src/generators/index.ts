export interface Meta {
  boilerplateType: string;
}

export abstract class Generator<T> {
  meta: Meta;

  constructor(meta: Meta) {
    this.meta = meta;
  }

  abstract prompt(): T;

  abstract build(): void;
}
