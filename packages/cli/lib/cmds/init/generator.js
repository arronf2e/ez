"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
exports.getGeneratorList = () => {
    return fs_1.readdirSync(path_1.resolve(__dirname, '..', '..', 'templates'))
        .filter(target => !target.startsWith('.'))
        .map(target => ({ name: target, value: target }));
};
