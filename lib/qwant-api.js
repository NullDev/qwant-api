
const request = require('request');
const langs = require('./langs');

// //////////////////////////////
// ----------------------------//
// Copyright (c) 2018 NullDev //
// ----------------------------//
// //////////////////////////////

const noop = () => { };

const userAgentString = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0';

const fields = [
  'web',
  'images',
  'news',
  'social',
  'videos',
  'music',
];


class ParseBody {
  static web({ result }) {
    return result.items.map(({ _id, ...item }) => item);
  }

  static images({ result }) {
    return result.items;
  }

  static news({ result }) {
    return result.items;
  }

  static social({ result }) {
    return result.items;
  }

  static videos({ result }) {
    return result.items;
  }

  static music({ result }) {
    return result.items;
  }
}

function getURL(keyword, count, offset, query, lang) { return `https://api.qwant.com/api/search/${keyword}?count=${count}&q=${query}&t=${query}&f=&offset=${offset}&locale=${lang}&uiv=4`; }

function qwantApiError(msg) { return new Error(`qwant-api error: ${msg}`); }


function isJSON(str) {
  try {
    const o = JSON.parse(str);
    if (o && typeof o === 'object') return o;
  } catch (e) { noop(); }
  return false;
}

async function performSearch(query, uri) {
  const options = {
    url: uri,
    method: 'GET',
    headers: { 'User-Agent': userAgentString },
  };

  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        return reject(err);
      }

      if (!isJSON(body) || body == null) return reject(qwantApiError(`The API returned an invalid response: ${body}`));

      const { error, status, data } = JSON.parse(body);

      if (status && status.toString().toLowerCase() !== 'success') {
        return reject(qwantApiError(`The API returned the error code "${error}"`));
      }

      try {
        const result = ParseBody[query](data);
        return resolve(result);
      } catch (parseErr) {
        return reject(qwantApiError('Something unexpected happend'));
      }
    });
  });
}

const qwant = {
  async search(query, options) {
    return new Promise((resolve, reject) => {
      if (!query || query == null) { return reject(qwantApiError("'category' is required")); }

      const userQuery = query.toLowerCase();

      if (!fields.includes(userQuery)) {
        return reject(qwantApiError(`${userQuery}' is not a valid category.`));
      }


      if (!options || !options.query) { return qwantApiError('No search query specified.'); }

      const count = (options.count ? options.count : 1);
      const offst = (options.offset ? options.offset : 0);

      if (Number.isNaN(count)) return reject(qwantApiError("'count' needs to be number"));
      if (Number.isNaN(offst)) return reject(qwantApiError("'offset' needs to be number"));

      if (!Number.isInteger(count)) return reject(qwantApiError("'count' needs to be a whole number (integer)"));
      if (!Number.isInteger(offst)) return reject(qwantApiError("'offset' needs to be a whole number (integer)"));

      const sq = encodeURIComponent(options.query);
      const langKey = (options.language ? options.language : 'english').toLowerCase();

      if (!(langKey in langs)) return reject(qwantApiError(`The language '${langKey}' does not Exist.`));

      const lang = langs[langKey];
      const queryURL = getURL(query, count, offst, sq, lang);

      try {
        const search = performSearch(query, queryURL);
        return resolve(search);
      } catch (err) {
        return reject(err);
      }
    });
  },

  getLanguages(code) { return (code ? langs : Object.keys(langs)); },
};

module.exports = qwant;
