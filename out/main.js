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
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = require('fs');
var cheerio = require('cheerio');
var lineReader = require('line-reader');
/*
//BEGIN: scraping pairs code/diagnosis into json file ------------------------------------------------------------------
// GET ALL CODES
code.main()  // original: 11891, deleted: 11889

// GET ALL "PREFERRED" DIAGNOSIS (main name of diagnosis)
preferred.getData();  // original: 11889

// MERGE codes.json and prefferedName.json
const inputCode = fs.readFileSync(path.join(__dirname, '..', 'output', 'codes.json'), 'utf-8');
const jsonCodes = JSON.parse(inputCode);
const inputPreffered = fs.readFileSync(path.join(__dirname, '..', 'output', 'preferredName.json'), 'utf-8');
const jsonPreferred = JSON.parse(inputPreffered);

var icd10: any = [];
const createICDjson = () => {
    return new Promise((resolve) => {
        for (let i = 0; i < jsonCodes.length; i++) {
            icd10[i] = {
                ...jsonCodes[i],
                ...jsonPreferred[i]
            }
            if (i == jsonCodes.length - 1) {
                resolve('JSON files have been merged.')
            }
        }
    })
}
createICDjson()
    .then( (data) => {
        console.log(data);
    } )
    .then( () => {
        const output = JSON.stringify(icd10, null, 2);
        fs.writeFileSync(path.join(__dirname, '..', 'output', 'ICD10.json'), output);
    })

// END: scraping pairs code/diagnosis into json file -----------------------------------------------------------------
*/
// FIND EXACT MATCH OR MATCH startsWith
var inputICD = fs.readFileSync(path.join(__dirname, '..', 'output', 'ICD10.json'), 'utf-8');
var jsonICD = JSON.parse(inputICD);
var inputSublimd = fs.readFileSync(path.join(__dirname, '..', 'input', 'diagnosis-list.json'), 'utf-8');
var jsonSublimd = JSON.parse(inputSublimd);
var matches = [];
var getMatch = function () {
    return new Promise(function (resolve) {
        var c = 0;
        var match = false;
        jsonSublimd.forEach(function (elemSub, i) {
            for (var i_1 = 0; i_1 < jsonICD.length; i_1++) {
                // IMPORTANT - two matching principles give two different outcomes
                // 1. elemICD.preferredName == elemSub.name -> 241 matches (more exact)
                // 2. elemICD.preferredName.startsWith(elemSub.name) -> 946 matches (correct codes but sometimes not specific enough)
                // Solution - first do exact match, then startsWith. Result: the first 241 matches will have the more specific code
                if (jsonICD[i_1].preferredName == elemSub.name) {
                    matches.push(__assign(__assign({}, elemSub), { CodeICD10GM2020: jsonICD[i_1].code, PreferredNameICD10GM2020: jsonICD[i_1].preferredName }));
                    match = true;
                    c++;
                    break; // if I don't break here the sublimd diagnose will have multiple matches that match startsWith 
                }
                else if (jsonICD[i_1].preferredName.startsWith(elemSub.name)) {
                    matches.push(__assign(__assign({}, elemSub), { CodeICD10GM2020: jsonICD[i_1].code, PreferredNameICD10GM2020: jsonICD[i_1].preferredName }));
                    match = true;
                    c++;
                    break; // same as above, alternatively the matches can be put into list
                }
            }
            if (!match) {
                matches.push(__assign(__assign({}, elemSub), { CodeICD10GM2020: "", PreferredNameICD10GM2020: "" }));
            }
            else {
                match = false;
            }
            if (i == jsonSublimd.length - 1) {
                resolve("Found " + c + " matches.");
            }
        });
    });
};
getMatch()
    .then(function (data) {
    console.log(data);
})
    .then(function () {
    var output = JSON.stringify(matches, null, 2);
    console.log("Control: Input has " + jsonSublimd.length + " elements. Output has " + matches.length + " elements.");
    fs.writeFileSync(path.join(__dirname, '..', 'output', 'diagnosis-list_ICD.json'), output);
});
