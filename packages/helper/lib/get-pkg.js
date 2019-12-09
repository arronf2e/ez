"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
function getPkgInfo({ cwd }) {
    return read_pkg_up_1.default.sync({ cwd });
}
exports.getPkgInfo = getPkgInfo;
