import * as functions from 'firebase-functions';
import * as express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();

const request = axios.create({
  timeout: 3000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
  },
});

// routing
app.get('/isbn/:id', async (req, res) => {
  try {
    const { params: { id } } = req;

    if (Number.isNaN(id) || (id.length !== 13 && id.length !== 10)) {
      throw new Error('Invalid ISBN Number.');
    }

    const responses = [];
    const [bookTwResponse, kingstoneResponse] =
        await Promise.all([getDetailsFromBooksTw(id), getDetailsFromKingstone(id)]);
    // const superbookcityResponse = await getDetailsFromSuperbookcity(id);
    responses.push(...bookTwResponse, ...kingstoneResponse);
    return res.status(200).json({ data: responses });
  } catch (e) {
    console.log(e);
    if (e.message) {
      return res.status(400).json({ err: e.message });
    }
    return res.status(500).json({ err: 'Unexpected error.' });
  }
});

app.get('*', async (req, res) => res.send(''));

// 博客來 (books.com.tw)
async function getDetailsFromBooksTw(isbnNumber) {
  const response = [];
  try {
    const baseUrl = 'http://search.books.com.tw';
    const searchUrl = '/search/query/cat/all/key/';
    const { data } = await request.get(baseUrl + searchUrl + isbnNumber);

    const $ = cheerio.load(data);
    const result = $('form#searchlist ul.searchbook li');
    if (result.length === 0) throw new Error('No result found');

    result.each((i, e) => {
      const bookUrl = $(e).find('a[rel=mid_name]').attr('href');
      const bookImage = $(e).find('a[rel=mid_image] img').attr('data-original');
      const bookName = $(e).find('h3').text().trim();
      const bookCat = $(e).find('span.cat').text().trim();
      const bookAuthors = [];
      $(e).find('a[rel=go_author]').each((j, elem) => {
        bookAuthors.push($(elem).text().trim());
      });
      const bookPublisher = $(e).find('a[rel=mid_publish]').text().trim();
      const bookPrice = $(e).find('span.price strong').last().text().trim().match(/\d+/).join('');

      response.push({
        source: '博客來',
        active: true,
        name: bookName || '',
        cat: bookCat || '',
        authors: bookAuthors.length > 0
                    ? bookAuthors.join()
                    : '',
        publisher: bookPublisher || '',
        price: bookPrice || 0,
        currency: 'TWD',
        url: bookUrl ? 'http:' + bookUrl : '',
        image: bookImage || '',
      });
    });
  } catch (e) {
    console.log(e);
    response.push({
      source: '博客來',
      active: false,
    });
  }
  return response;
}

// 金石堂 (kingstone.com.tw)
async function getDetailsFromKingstone(isbnNumber) {
  const response = [];
  try {
    const baseUrl = 'https://www.kingstone.com.tw';
    const searchUrl = '/search/result.asp?c_name=';
    const { data } = await request.get(baseUrl + searchUrl + isbnNumber);

    const $ = cheerio.load(data);
    const result = $('div.box.row_list ul li');
    if (result.length === 0) throw new Error('No result found');

    result.each((i, e) => {
      const bookUrl = $(e).find('a.anchor').attr('href');
      const bookImage = $(e).find('a.anchor img').attr('src');
      const bookName = $(e).find('a.anchor span').text().trim();
      const bookCat = $(e).find('span.classification a.main_class').text().trim();
      const bookAuthors = [];
      $(e).find('span.author a').each((j, elem) => {
        bookAuthors.push($(elem).text().trim());
      });
      const bookPublisher = $(e).find('span.publisher a').text().trim();
      const bookPrice = $(e).find('span.price span').last().text().trim().match(/\d+/).join('');

      response.push({
        source: '金石堂',
        active: true,
        name: bookName || '',
        cat: bookCat || '',
        authors: bookAuthors.length > 0
                    ? bookAuthors.join()
                    : '',
        publisher: bookPublisher || '',
        price: bookPrice || 0,
        currency: 'TWD',
        url: bookUrl ? baseUrl + bookUrl : '',
        image: bookImage || '',
      });
    });
  } catch (e) {
    console.log(e);
    response.push({
      source: '金石堂',
      active: false,
    });
  }
  return response;
}

// 超閱網 (superbookcity.com)
// async function getDetailsFromSuperbookcity(isbnNumber) {
//   const response = [];
//   try {
//     const baseUrl = 'https://www.superbookcity.com';
//     const searchUrl = '/catalogsearch/result/?q=';
//     const { data } = await request.get(baseUrl + searchUrl + isbnNumber);
//
//     const $ = cheerio.load(data);
//     const result = $('div.results-view ul.products-grid li.item');
//     if (result.length === 0) {
//       throw new Error('No result found');
//     }
//
//     result.each((i, e) => {
//       const bookUrl = $(e).find('h2.product-name a').attr('href');
//       const bookName = $(e).find('h2.product-name').text().trim();
//       const bookAuthors = $(e).find('div.author').text().trim().replace('作者:', '');
//       let bookPrice = $(e).find('p.special-price span.price').text().trim().replace('HK$', '');
//
//       if (!bookPrice) {
//         bookPrice = $(e).find('span.regular-price span.price').text().trim().replace('HK$', '');
//       }
//
//       response.push({
//         source: '超閱網',
//         active: true,
//         name: bookName || '',
//         authors: bookAuthors || '',
//         price: bookPrice || 0,
//         currency: 'HKD',
//         url: bookUrl || '',
//       });
//     });
//   } catch (e) {
//     response.push({
//       source: '超閱網',
//       active: false,
//     });
//   }
//   return response;
// }

exports.book = functions.https.onRequest(app);
