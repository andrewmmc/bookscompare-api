const request = require('../../utils/request');
const baseUrl = 'https://search.books.com.tw';

async function search(query) {
  const searchUrl = '/search/query/cat/all/key/';
  return await request.get(baseUrl + searchUrl + query);
}

module.exports = {
  search
};
