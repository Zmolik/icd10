// import * as path from 'path';
// const fs = require('fs');
// const cheerio = require('cheerio');

// const fetch = require("node-fetch");
// const { DOMParser } = require('xmldom');
// const lineReader = require('line-reader');

//OPENING FILE with diagnosis
// const input = fs.readFileSync(path.join(__dirname, '..', 'input', 'diagnosis-list.json'), 'utf-8');
// const json = JSON.parse(input);





// icd10gm2020syst_claml_20190920.xml

//var parser = new XMLparser(data);
// const getData = async () => {
//     const XMLfile = 'test.xml';
    // const XMLfile = 'icd10gm2020syst_claml_20190920.xml';
    // const data = fs.readFileSync(path.join(__dirname, '..', 'input', XMLfile), 'utf-8');
    // prejmenovat "kind" na "id"
    // var modifiedData = await data.replace(/kind/g, "id");
    

    // const $ = await cheerio.load(data);

    // CODE tiskne prvni kod, musim vymyslet jak pres to iterovat
    // console.log($("Class").attr("code"));
    
    // const xml = $("[code]");
    // console.log(xml.html());





    




    // DIAG preffered - musi se "kind" prejmenovat na "id" - vytiskne vsechny
    //console.log($("#preffered").text())

    // DIAG inclusion- musi se "kind" prejmenovat na "id" - vytiskne vsechny
    //console.log($("#inclusion").text())






    // let domParser = new DOMParser();
    // let xml = domParser.parseFromString(data, "application/xml");
    // console.log(xml);
// }



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


// const doubleT: string = '\t\t';
// const trippleT: string = '\t\t\t'; 

// const list: string[] = [
//     '\t\t\tNicht als Rezidivhernie bezeichnet',
//     '\t\t',
//     '\t\t\tRezidivhernie',
//     '\t\t',
//     '\t\t\tMildes Atemnotsyndrom des Erwachsenen [ARDS]',
//     '\t\t',
//     '\t\t\tModerates Atemnotsyndrom des Erwachsenen [ARDS]',
//     '\t\t',
//     '\t\t\tSchweres Atemnotsyndrom des Erwachsenen [ARDS]',
//     '\t\t']

// const newList: string[] = [];
// list.forEach( (elem) => {
//     if (elem == '\t\t') {
//         console.log('elem')
//     } else {
//         let diag = elem.replace('\t\t\t', '');
//         newList.push(diag);
//     }
// })