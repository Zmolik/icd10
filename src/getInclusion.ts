// NOT USED, IGNORE THE CODE
import * as path from 'path';
const fs = require('fs');
const cheerio = require('cheerio');


export const getData = async () => {
    // const XMLfile = 'test.xml';
    const XMLfile = 'icd10gm2020syst_claml_20190920.xml';

    const data = fs.readFileSync(path.join(__dirname, '..', 'input', XMLfile), 'utf-8');
    // prejmenovat "kind" na "id"
    const modifiedData = await data.replace(/kind/g, "id");
    const $ = await cheerio.load(modifiedData);

    // diagnosy zacinaji na 288. miste (A00) a jedou az do konce
    const rawTextPreffered = $("#inclusion").text();
    var inclusionList = rawTextPreffered.split("\n");  // console.log(inclusionList);
    var inclusionListUpdated: string[] = [];

    const getPreferred = async () => {
        return new Promise ((resolve) => {
            for (let i = 0; i < inclusionList.length; i++) {
                if (inclusionList[i] !== '' && i == inclusionList.length - 1) {
                    inclusionListUpdated.push(inclusionList[i]);
                    resolve('All "kind=inclusion" have been saved into the list "inclusionListUpdated".')
                } else if (i == inclusionList.length - 1) {
                    resolve('All "kind=inclusion" have been saved into the list "inclusionListUpdated".')
                } else if (inclusionList[i] !== '') {
                    inclusionListUpdated.push(inclusionList[i]);
                }                                                       // console.log('list', prefferedListUpdated.length)
            }

        })
    }
    
    getPreferred()
        .then((data) => {
            console.log(data);
    })
        .then( () => {
            console.log(inclusionListUpdated);
            console.log('LENGTH ', inclusionListUpdated.length)
        })   
}