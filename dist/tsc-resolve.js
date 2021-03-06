"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tsconfig = require("tsconfig");
var utils_1 = require("./utils");
function getFileReplaceTask(outDir, filePath, modules) {
    var replaces = [];
    for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
        var module_1 = modules_1[_i];
        var moduleDir = path.resolve(outDir, module_1.path);
        var diff = path.relative(path.resolve(moduleDir, path.dirname(filePath)), moduleDir);
        diff = utils_1.convertToUnixPath(diff);
        if (!(diff.lastIndexOf(".", 0) === 0)) {
            diff = "./" + diff;
        }
        var regExp1 = new RegExp(utils_1.escapeRegExp("require(\"" + module_1.name + "\")"), "g");
        var replaceText1 = "require(\"" + diff + "\")";
        var regExp2 = new RegExp(utils_1.escapeRegExp("require(\"" + module_1.name + "/"), "g");
        var replaceText2 = "require(\"" + diff;
        var regExp3 = new RegExp(utils_1.escapeRegExp("require('" + module_1.name + "')"), "g");
        var replaceText3 = "require('" + diff + "')";
        var regExp4 = new RegExp(utils_1.escapeRegExp("require('" + module_1.name + "/"), "g");
        var replaceText4 = "require('" + diff;
        if (diff !== "./") {
            replaceText2 += "/";
            replaceText4 += "/";
        }
        replaces.push({ regExp: regExp1, text: replaceText1 });
        replaces.push({ regExp: regExp2, text: replaceText2 });
        replaces.push({ regExp: regExp3, text: replaceText3 });
        replaces.push({ regExp: regExp4, text: replaceText4 });
    }
    return utils_1.replaceInFile(filePath, replaces);
}
function resolve(tsConfigFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var config, outDir, jsFiles, modules;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!utils_1.endsWith(tsConfigFilePath, ".json")) {
                        tsConfigFilePath = path.join(tsConfigFilePath, utils_1.CONFIG_FILENAME);
                    }
                    return [4 /*yield*/, tsconfig.readFile(tsConfigFilePath)];
                case 1:
                    config = _a.sent();
                    utils_1.validateTsConfig(config);
                    outDir = path.resolve(path.dirname(tsConfigFilePath), config.compilerOptions.outDir);
                    jsFiles = utils_1.getJSFiles(outDir);
                    if (!jsFiles.length) {
                        throw new Error("No .js files found");
                    }
                    modules = Object.keys(config.compilerOptions.paths);
                    return [4 /*yield*/, Promise.all(jsFiles.map(function (filePath) {
                            var tsModules = [];
                            for (var _i = 0, modules_2 = modules; _i < modules_2.length; _i++) {
                                var moduleName = modules_2[_i];
                                var modulePath = utils_1.rtrim(config.compilerOptions.paths[moduleName][0], "*"); // Remove trailing *s
                                tsModules.push({ name: moduleName.replace("/*", ""), path: modulePath });
                            }
                            return getFileReplaceTask(outDir, filePath, tsModules);
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.resolve = resolve;
