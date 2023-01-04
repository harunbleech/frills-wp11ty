const locales = require('./locales.js');
const _all = require('./_all.js');
const type = "artists"

module.exports = async function getData(){
    console.log("Fetching artists...");

    var dataFinal = [];
    const dataAll = _all;

    for (let i in locales.langs) {
        const lang = locales.langs[i].code;
        dataFinal = [...dataFinal, ...dataAll[lang][type]]
    }

    return dataFinal;
}
