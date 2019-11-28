import Metalsmith from 'metalsmith';
export interface Meta {
    name: string;
    description?: string;
    boilerplateType: string;
}
export interface Generator {
    meta: Meta;
    templatePath: string;
    queryFeatures(): object;
    updateTemplate({ templatePath, remoteUrl }: {
        templatePath: string;
        remoteUrl: string;
    }): void;
    build(): void;
    run(): void;
}
export declare abstract class BasicGenerator implements Generator {
    meta: Meta;
    templatePath: string;
    ignores: RegExp[];
    renderSpinner: any;
    constructor(meta: Meta);
    updateTemplate({ remoteUrl }: {
        remoteUrl: string;
    }): Promise<void>;
    queryFeatures(): Promise<object>;
    renderTemplate: () => Metalsmith.Plugin;
    build(): Promise<void>;
    abstract run(): void;
}
