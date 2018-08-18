const helpers = require('./helpers');
const baseUrl = 'http://www.eslite.com';

async function search(query) {
  const searchUrl = '/Search_BW.aspx?query=';
  return await helpers.request.get(baseUrl + searchUrl + query);
}

module.exports = {
  search
};
