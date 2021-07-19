const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const STRONA_TESTOWA = `https://www.tendacn.com/product/4G07.html`;

axios.get(STRONA_TESTOWA).then(({data}) => {
  const $ = cheerio.load(data);
  const tableResponsive = $('.table-responsive');
  $('html').html(tableResponsive);

  // Remove elements
  $('style,img').remove();
  // Remove class and id attributes
  $('div,h4,h3,h2,h1').removeAttr('class').removeAttr('id');

  const html = $.html().replace('<!DOCTYPE html><html lang="zh-CN">', '');
  fs.writeFile(`text2.html`, html, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
