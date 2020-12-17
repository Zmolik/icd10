import * as path from 'path';
const lineReader = require('line-reader');
const fs = require('fs');

// const XMLfile = 'test.xml';
// const XMLfile = 'icd10gm2020syst_claml_20190920.xml';
const XMLfile = 'icd10gm2020syst_claml_20190920-deleted.xml';  // got the correct number of codes only when I delete the first 3076 lines of data, no idea why
var codeList: string[] = [];   

const getCodes = async () => {
    return new Promise((resolve) => {  
        lineReader.eachLine(path.join(__dirname, '..', 'input', XMLfile), function(line: string, last: boolean) {
            line = line.trim()
            if (line.startsWith("<Class code=") && line.endsWith('kind="category">')) {
                line = line.slice(13, -18);
                codeList.push(line);
            } else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="dagger">')) {
                line = line.slice(13, -33);
                codeList.push(line);
            } else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="optional">')) {
                line = line.slice(13, -35);
                codeList.push(line);
            } else if (line.startsWith("<Class code=") && line.endsWith('kind="category" usage="aster">')) {
                line = line.slice(13, -32);
                codeList.push(line);
            } else if (line.startsWith("<Class code=") && line.endsWith('kind="block">')) {
                line = line.slice(13, -15);
                codeList.push(line);
            } else if (line.startsWith("<Class code=") && line.endsWith('kind="chapter">')) {
                line = line.slice(13, -17);
                codeList.push(line);
            } else if (last === true) {
                resolve('All codes have been saved into the list "codeList".')
            }
        })
    })
}
var json: any = []
export const main = () => {
    getCodes()
    .then((data) => {
        console.log(data);
    })
    .then( () => {
        //console.log(codeList);
        //console.log('LENGTH ', codeList.length);
        codeList.forEach(elem => {
            json.push({
                code: elem
            })
        })
    })
    .then( () => {
        const output = JSON.stringify(json, null, 2);
        fs.writeFileSync(path.join(__dirname, '..', 'output', 'codes.json'), output);
    })
}






