"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
exports.getGenerators = () => {
    return fs_1.readdirSync(path_1.resolve(__dirname, '..', '..', 'generators'))
        .filter(target => !target.startsWith('.'))
        .map(target => ({ name: target, value: target }));
};
