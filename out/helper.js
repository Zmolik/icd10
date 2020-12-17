"use strict";
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
var fs = require('fs');
var cheerio = require('cheerio');
var fetch = require("node-fetch");
var DOMParser = require('xmldom').DOMParser;
var lineReader = require('line-reader');
//OPENING FILE with diagnosis
// const input = fs.readFileSync(path.join(__dirname, '..', 'input', 'diagnosis-list.json'), 'utf-8');
// const json = JSON.parse(input);
// icd10gm2020syst_claml_20190920.xml
//var parser = new XMLparser(data);
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var XMLfile;
    return __generator(this, function (_a) {
        XMLfile = 'test.xml';
        return [2 /*return*/];
    });
}); };
// getData();
// const XMLfile = 'test.xml';
// const XMLfile = 'icd10gm2020syst_claml_20190920.xml';
// var codeList: string[] = [];   
// const getCodes = async () => {
//     return new Promise((resolve) => {  
//         lineReader.eachLine(path.join(__dirname, '..', 'input', XMLfile), function(line: string, last: boolean) {
//             line = line.trim()
//             if (line.startsWith("<Class code=") && line.endsWith('kind="category">')) {
//                 line = line.slice(13, -18);
//                 codeList.push(line);
//             } else if (last === true) {
//                 resolve('Codes have been saved into the list.')
//             }
//         })
//     })
// }
// getCodes()
//     .then((data) => {
//         console.log(data);
// })
//     .then( () => {
//         console.log(codeList);
//     })
// SAVING FILE
// const output = JSON.stringify(json, null, 2);
// fs.writeFileSync(path.join(__dirname, '..', 'output', 'diagnosis-list-ICD10.json'), output);
// const XMLfile = 'icd10gm2020syst_claml_20190920.xml';
// var c: number = 0;
// lineReader.eachLine(path.join(__dirname, '..', 'input', XMLfile), function(line: string, last: boolean) {
//     line = line.trim();
//     if (line.startsWith("<Class code=") 
//         && !line.endsWith('kind="category">')
//         && !line.endsWith('kind="category" usage="dagger">')
//         && !line.endsWith('kind="category" usage="optional">')
//         && !line.endsWith('kind="category" usage="aster">')
//         && !line.endsWith('kind="block">')) {
//             console.log(line);
//             c++;
//             console.log(c);
//     }
// })
// const str: string = 'kind="chapter">'
// const str2: string = 'kind="category" usage="aster">'
// console.log(str.length)
// console.log(str2.length)
