const request = require('../../utils/request');
const baseUrl = 'https://www.cite.com.tw';

async function search(isbnNumber) {
  const searchUrl = '/search_result?isbn=';
  return await request.get(baseUrl + searchUrl + isbnNumber);
}

module.exports = {
  search
};
