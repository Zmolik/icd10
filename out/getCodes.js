"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var path = __importStar(require("path"));
var lineReader = require('line-reader');
var fs = require('fs');
// const XMLfile = 'test.xml';
// const XMLfile = 'icd10gm2020syst_claml_20190920.xml';
var XMLfile = 'icd10gm2020syst_claml_20190920-deleted.xml'; // got the correct number of codes only when I delete the first 3076 lines of data, no idea why
var codeList = [];
var getCodes = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                lineReader.eachLine(path.join(__dirname, '..', 'input', XMLfile), function (line, last) {
                    line = line.trim();
                    if (line.startsWith("<Class code=") && line.endsWith('kind="category">')) {
                        line = line.slice(13, -18);
                        codeList.push(line);
                    }
                    else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="dagger">')) {
                        line = line.slice(13, -33);
                        codeList.push(line);
                    }
                    else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="optional">')) {
                        line = line.slice(13, -35);
                        codeList.push(line);
                    }
                    else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="aster">')) {
                        line = line.slice(13, -32);
                        codeList.push(line);
                    }
                    else if (line.startsWith("<Class code=") && line.endsWith('kind="block">')) {
                        line = line.slice(13, -15);
                        codeList.push(line);
                    }
                    else if (line.startsWith("<Class code=") && line.endsWith('kind="chapter">')) {
                        line = line.slice(13, -17);
                        codeList.push(line);
                    }
                    else if (last === true) {
                        resolve('All codes have been saved into the list "codeList".');
                    }
                });
            })];
    });
}); };
var json = [];
var main = function () {
    getCodes()
        .then(function (data) {
        console.log(data);
    })
        .then(function () {
        //console.log(codeList);
        //console.log('LENGTH ', codeList.length);
        codeList.forEach(function (elem) {
            json.push({
                code: elem
            });
        });
    })
        .then(function () {
        var output = JSON.stringify(json, null, 2);
        fs.writeFileSync(path.join(__dirname, '..', 'output', 'codes.json'), output);
    });
};
exports.main = main;
