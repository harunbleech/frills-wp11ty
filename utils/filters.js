const util = require('util');
const { format, formatISO } = require('date-fns');
const markdown = require('./markdown');
const site = require('../src/_data/_site');

module.exports = {
    format: format,
    formatISO: formatISO,
    log: (data) => console.log(`\n\n${util.inspect(data)}\n\n`),
    markdown: (content) => markdown.renderInline(content),
    url: url => url? url.replace(site.dataUrl, '/') : ""
};
