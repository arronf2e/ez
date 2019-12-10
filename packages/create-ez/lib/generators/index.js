"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var ora_1 = __importDefault(require("ora"));
var promise_1 = __importDefault(require("simple-git/promise"));
var metalsmith_1 = __importDefault(require("metalsmith"));
var consolidate_1 = require("consolidate");
var inquirer_1 = require("inquirer");
var helper_1 = require("@ez-fe/helper");
var BasicGenerator = /** @class */ (function () {
    function BasicGenerator(meta) {
        var _this = this;
        this.ignores = [/^.git\/\w*/, /^features.js$/];
        this.renderSpinner = ora_1.default(helper_1.info('rendering'));
        this.renderTemplate = function () {
            var ignores = _this.ignores;
            var render = function (files, metalsmith, done) { return __awaiter(_this, void 0, void 0, function () {
                var fileList, metalsmithMetadata;
                return __generator(this, function (_a) {
                    fileList = Object.keys(files).filter(function (fileName) {
                        var isIgnored = ignores.some(function (regex) { return regex.test(fileName); });
                        if (isIgnored) {
                            delete files[fileName];
                        }
                        return !isIgnored;
                    });
                    metalsmithMetadata = metalsmith.metadata();
                    fileList.forEach(function (fileName) {
                        var fileContent = files[fileName].contents.toString();
                        var needRender = /{{([^{}]+)}}/g.test(fileContent);
                        if (needRender) {
                            consolidate_1.handlebars.render(fileContent, metalsmithMetadata, function (err, res) {
                                if (err) {
                                    helper_1.message.error(helper_1.em("[" + fileName + "]") + " " + helper_1.info(err.message));
                                    done(err, files, metalsmith);
                                }
                                files[fileName].contents = Buffer.from(res, 'utf-8');
                            });
                        }
                    });
                    done(null, files, metalsmith);
                    return [2 /*return*/];
                });
            }); };
            return render;
        };
        var boilerplateType = meta.boilerplateType;
        this.meta = meta;
        this.templatePath = path_1.resolve(__dirname, boilerplateType, 'template');
    }
    BasicGenerator.prototype.updateTemplate = function (_a) {
        var remoteUrl = _a.remoteUrl;
        return __awaiter(this, void 0, void 0, function () {
            var template, templatePath, hasTemplate, git, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        template = new helper_1.Signale({
                            interactive: true,
                            disabled: false,
                            stream: process.stdout,
                            config: {
                                displayTimestamp: false,
                            },
                        });
                        templatePath = this.templatePath;
                        hasTemplate = fs_1.existsSync(templatePath);
                        if (!hasTemplate) {
                            fs_1.mkdirSync(templatePath);
                        }
                        git = promise_1.default(templatePath);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        template.pending("" + (hasTemplate ? 'updating template' : 'downloading template'));
                        if (!!hasTemplate) return [3 /*break*/, 3];
                        return [4 /*yield*/, git.clone(remoteUrl, templatePath)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, git.checkout('master')];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, git.reset('hard')];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, git.pull('origin', 'master')];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _b.sent();
                        template.fatal(e_1);
                        process.exit(-1);
                        return [3 /*break*/, 9];
                    case 9:
                        template.complete("" + (hasTemplate ? 'template update completed!' : 'template download completed!'));
                        return [2 /*return*/];
                }
            });
        });
    };
    BasicGenerator.prototype.queryFeatures = function () {
        return __awaiter(this, void 0, void 0, function () {
            var templatePath, features, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templatePath = this.templatePath;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, helper_1.dynamicImport(path_1.resolve(templatePath, 'features'))];
                    case 2:
                        features = (_a.sent()).features;
                        return [4 /*yield*/, inquirer_1.prompt(features)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_2 = _a.sent();
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BasicGenerator.prototype.checkFolderIsEmpty = function (_a) {
        var destination = _a.destination;
        return __awaiter(this, void 0, void 0, function () {
            var existed, hasChildren, overWrite;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        existed = fs_1.existsSync(destination);
                        if (!existed)
                            return [2 /*return*/, true];
                        hasChildren = existed || fs_1.readdirSync(destination).length;
                        if (!hasChildren) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    name: 'overWrite',
                                    message: 'The destination folder is not empty, whether to overwrite?',
                                    type: 'confirm',
                                },
                            ])];
                    case 1:
                        overWrite = (_b.sent()).overWrite;
                        return [2 /*return*/, overWrite];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BasicGenerator.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cwd, currentWorkDir, _a, templatePath, meta, name, destination, overWrite, features;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cwd = process.cwd;
                        currentWorkDir = cwd();
                        _a = this, templatePath = _a.templatePath, meta = _a.meta;
                        name = meta.name;
                        destination = path_1.resolve(currentWorkDir, name);
                        if (name === '.') {
                            /** 针对当前文件夹初始化特殊处理 */
                            destination = currentWorkDir;
                            Object.assign(this.meta, { name: 'react-admin' });
                        }
                        return [4 /*yield*/, this.checkFolderIsEmpty({ destination: destination })];
                    case 1:
                        overWrite = _b.sent();
                        if (!overWrite) {
                            helper_1.message.info('operation cancelled!');
                            process.exit(-1);
                        }
                        return [4 /*yield*/, this.queryFeatures()];
                    case 2:
                        features = _b.sent();
                        this.renderSpinner.start();
                        metalsmith_1.default(__dirname)
                            .metadata(__assign(__assign({}, features), meta))
                            .source(templatePath)
                            .destination(destination)
                            .clean(false)
                            .use(this.renderTemplate())
                            .build(function (err) {
                            if (err) {
                                helper_1.message.error(err.message);
                                process.exit(-1);
                            }
                        });
                        this.renderSpinner.succeed('template rendered successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    return BasicGenerator;
}());
exports.BasicGenerator = BasicGenerator;
