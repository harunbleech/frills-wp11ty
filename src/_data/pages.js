const _all = require('./_all.js');
const locales = require('./locales.js');
const type = "pages"

async function getData(){
    console.log("------ Fetching pages... ------");

    const dataFinal = [];
    const dataAll = _all;

    for (let i in locales.langs) {
        const lang = locales.langs[i].code;
        const data = dataAll[lang][type];

        for (let j in data) {
            if(data[j].acf) {
                if(data[j].acf.options) {
                    const slugPagination = data[j].acf.options.pagination;

                    if (slugPagination == undefined || slugPagination == "") {
                        dataFinal.push(data[j]);
                    }
                }
            }
        }
    }

    return dataFinal;
}

module.exports = getData;
