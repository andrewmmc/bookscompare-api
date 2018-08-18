const axios = require('axios');

const request = axios.create({
  timeout: 3000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
  },
});

module.exports = request;
