"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_notifier_1 = __importDefault(require("update-notifier"));
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
function checkUpdate(cwd) {
    const pkg = read_pkg_up_1.default.sync({ cwd });
    const notifier = update_notifier_1.default({
        pkg: pkg ? .packageJson : ,
        updateCheckInterval: 0,
    });
    notifier.notify();
}
exports.checkUpdate = checkUpdate;
