const helpers = require('./helpers');
const baseUrl = 'https://www.cite.com.tw';

async function search(isbnNumber) {
  const searchUrl = '/search_result?isbn=';
  return await helpers.request.get(baseUrl + searchUrl + isbnNumber);
}

module.exports = {
  search
};
