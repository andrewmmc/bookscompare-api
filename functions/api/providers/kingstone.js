const request = require('../../utils/request');
const baseUrl = 'https://www.kingstone.com.tw';

async function search(query) {
  const searchUrl = '/search/result.asp?c_name=';
  return await request.get(baseUrl + searchUrl + query);
}

module.exports = {
  search
};
