const { flatten: _flatten } = require('lodash');
const price = require('../utils/price');

async function get(req, res) {
  try {
    const { params: { id } } = req;

    if (Number.isNaN(id) || (id.length !== 13 && id.length !== 10)) {
      throw new Error('Invalid ISBN Number.');
    }

    const data = _flatten(
      await Promise.all([
        price.getDetailsFromBooksTw(id),
        price.getDetailsFromKingstone(id),
        price.getDetailsFromCite(id),
        // price.getDetailsFromEslite(id),
      ]),
    );

    const responses = data
      .filter(item => item.active)
      // sort by price ASC default
      .sort((a, b) => a.price - b.price);

    return res.status(200).json({ data: responses });
  } catch (e) {
    console.error(e);
    if (e.message) {
      return res.status(400).json({ err: e.message });
    }
    return res.status(500).json({ err: 'Unexpected error.' });
  }
}

module.exports = {
  get
};
