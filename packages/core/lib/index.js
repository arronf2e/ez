"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const ezDebug = debug_1.default('ez');
class Ez {
    constructor() {
        const { cwd } = process;
        this.cwd = cwd();
        ezDebug(1234);
    }
}
exports.default = Ez;
