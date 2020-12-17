import * as path from 'path';
import * as code from '.\\getCodes';
import * as preferred from '.\\getPreferred';
// import * as inclusion from '.\\getInclusion';
import { resolve } from 'path';
const fs = require('fs');
const cheerio = require('cheerio');
const lineReader = require('line-reader');

/*  
//BEGIN: scraping from claml into json file ------------------------------------------------------------------
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

// END: scraping from claml into json file -----------------------------------------------------------------
*/


// FIND EXACT MATCH OR MATCH startsWith
const inputICD = fs.readFileSync(path.join(__dirname, '..', 'output', 'ICD10.json'), 'utf-8');
const jsonICD = JSON.parse(inputICD);
const inputSublimd = fs.readFileSync(path.join(__dirname, '..', 'input', 'diagnosis-list.json'), 'utf-8');
const jsonSublimd = JSON.parse(inputSublimd);


const matches = [];
const getMatch = () => {
    return new Promise((resolve) => {
        var c: number = 0;
        let match = false;
        jsonSublimd.forEach((elemSub, i) => {
            for (let i = 0; i < jsonICD.length; i++) {
                // IMPORTANT - two matching principles give two different outcomes
                // 1. elemICD.preferredName == elemSub.name -> 241 matches (more exact)
                // 2. elemICD.preferredName.startsWith(elemSub.name) -> 345 matches (correct codes but sometimes not specific enough)
                // Solution - first do exact match, then startsWith. Result: the first 241 matches will have the more specific code
                if (jsonICD[i].preferredName == elemSub.name) {
                    matches.push(
                        {
                            ...elemSub,
                            CodeICD10GM2020: jsonICD[i].code,
                            PreferredNameICD10GM2020: jsonICD[i].preferredName
                        }
                    )
                    match = true;
                    c++;
                    break;  // if I don't break here the sublimd diagnose will have multiple matches that match startsWith 
                } else if (jsonICD[i].preferredName.startsWith(elemSub.name)) {
                    matches.push(
                        {
                            ...elemSub,
                            CodeICD10GM2020: jsonICD[i].code,
                            PreferredNameICD10GM2020: jsonICD[i].preferredName
                        }
                    )
                    match = true;
                    c++;
                    break;  // same as above, alternatively the matches can be put into list
                }
            } 
            if (!match) {
                matches.push(
                    {
                        ...elemSub,
                        CodeICD10GM2020: "",
                        PreferredNameICD10GM2020: ""
                    }
                )
            } else {
                match = false;
            }
            if (i == jsonSublimd.length - 1) {
                resolve(`Found ${c} matches.`)
            }
        })
    })
}
getMatch()
    .then( (data) => {
        console.log(data);
    } )
    .then( () => {
        const output = JSON.stringify(matches, null, 2);
        console.log(`Control: Input has ${jsonSublimd.length} elements. Output has ${matches.length} elements.`)
        fs.writeFileSync(path.join(__dirname, '..', 'output', 'diagnosis-list_ICD.json'), output);
    })






