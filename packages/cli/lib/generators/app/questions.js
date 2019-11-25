"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const helpers_1 = require("@/helpers");
const { cwd } = process;
exports.questions = [
    {
        name: 'name',
        type: 'input',
        default: path_1.basename(cwd()) || 'react-admin',
        validate: (input) => {
            if (/^[a-zA-Z0-9_-]{1,32}|\.$/.test(input))
                return true;
            return helpers_1.error('Invalid package name');
        },
    },
    {
        name: 'typescript',
        type: 'confirm',
        message: 'Do you want to use typescript?',
        default: true,
    },
    {
        name: 'features',
        message: 'What functionality do you want to enable?',
        type: 'checkbox',
        choices: [
            { name: 'antd', value: 'antd' },
            { name: 'code splitting', value: 'dynamicImport' },
            { name: 'dll', value: 'dll' },
        ],
    },
];
