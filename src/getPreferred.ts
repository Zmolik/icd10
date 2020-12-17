import * as path from 'path';
const fs = require('fs');
const cheerio = require('cheerio');


export const getData = async () => {
    // const XMLfile = 'test.xml';
    const XMLfile = 'icd10gm2020syst_claml_20190920.xml';

    const data = fs.readFileSync(path.join(__dirname, '..', 'input', XMLfile), 'utf-8');
    // rename  "kind" to "id" (because I don't know how to access kind using cheerio but I know how to access id) - if you know how to access kind please tell me!:)
    const modifiedData = await data.replace(/kind/g, "id");
    const $ = await cheerio.load(modifiedData);

    // diagnoses start on line 3076 (ctrl+f "A00")
    const rawTextPreffered = $("#preferred").text();
    var prefferedList = rawTextPreffered.split("\n");
    var prefferedListUpdated: string[] = [];

    const getPreferred = async () => {
        return new Promise ((resolve) => {
            for (let i = 0; i < prefferedList.length; i++) {
                if (prefferedList[i] !== '' && i == prefferedList.length - 1) {
                    prefferedListUpdated.push(prefferedList[i]);
                    resolve('All "kind=preferred" have been saved into the list "prefferedListUpdated".')
                } else if (i == prefferedList.length - 1) {
                    resolve('All "kind=preferred" have been saved into the list "prefferedListUpdated".')
                } else if (prefferedList[i] !== '') {
                    prefferedListUpdated.push(prefferedList[i]);
                }                                                       
            }

        })
    }
    const newList: string[] = [];
    var json: any = []
    getPreferred()
        .then((data) => {
            console.log(data);
        })
        .then( () => {
            // console.log(prefferedListUpdated);
            // console.log('LENGTH ', prefferedListUpdated.length);
            prefferedListUpdated.forEach( (elem, i) => {
                if (elem !== '\t\t' && i > 525) {
                    let diag = elem.replace('\t\t\t', '');
                    newList.push(diag);
                }
            })
        })  
        .then( () => {
            console.log(newList)
            console.log('LENGTH ', newList.length)
            newList.forEach(elem => {
                json.push({
                    preferredName: elem
                })
            })
        }) 
        .then( () => {
            const output = JSON.stringify(json, null, 2);
            fs.writeFileSync(path.join(__dirname, '..', 'output', 'preferredName.json'), output);
        })
}
