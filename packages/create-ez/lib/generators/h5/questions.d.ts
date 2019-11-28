declare const _default: ({
    name: string;
    type: string;
    message: string;
    default: boolean;
    choices?: undefined;
} | {
    name: string;
    message: string;
    type: string;
    choices: {
        name: string;
        value: string;
    }[];
    default?: undefined;
})[];
export default _default;
