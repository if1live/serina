'use strict';

const Twitter = require('twitter');
const yup = require('yup');

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const schema = yup.object().shape({
  id: yup.string().required(),
  access_token_key: yup.string().required(),
  access_token_secret: yup.string().required(),
});

async function fetchTweet(opts) {
  const { id, access_token_key, access_token_secret } = opts;
  const client = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key,
    access_token_secret,
  });

  const p = new Promise((resolve, reject) => {
    client.get('statuses/show', { id }, (error, tweets, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(tweets);
    });
  })
  return p;
}

function errorToStatusCode(err) {
  // https://developer.twitter.com/en/docs/basics/response-codes.html
  const table = {
    3: 400,
    13: 404,
    17: 404,
    32: 401,
    34: 404,
    36: 403,
    38: 403,
    44: 400,
    50: 404,
    63: 403,
    64: 403,
    // 68
    87: 403,
    // 88
    // 89
    // 92
    93: 403,
    99: 403,
    120: 403,
    130: 503,
    131: 500,
    135: 401,
    139: 403,
    144: 404,
    150: 403,
    151: 403,
    160: 403,
    161: 403,
    179: 403,
    185: 403,
    186: 403,
    // 187
    195: 403,
    205: 403,
    214: 403,
    215: 400,
    220: 403,
    // 226
    // 231
    // 251
    261: 403,
    271: 403,
    272: 403,
    323: 400,
    324: 400,
    325: 400,
    326: 403,
    327: 403,
    349: 403,
    354: 403,
    355: 409,
    385: 403,
    386: 403,
    407: 400,
    415: 403,
    416: 401,
    417: 401,
  };

  const code = err[0].code;
  const statusCode = table[code];
  return statusCode ? statusCode : 500;
}

async function main() {
  const id = process.argv[process.argv.length - 1];
  const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  try {
    const data = await fetchTweet({
      id,
      access_token_key: ACCESS_TOKEN_KEY,
      access_token_secret: ACCESS_TOKEN_SECRET,
    });
    console.log(data);

  } catch (err) {
    const statusCode = errorToStatusCode(err);
    console.error({ statusCode, err });
  }
}

module.exports.show = async (event, context, callback) => {
  const headers = {
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
  };

  // valida schema
  const opts = event.queryStringParameters;
  try {
    await schema.validate(opts);
  } catch (err) {
    const response = {
      statusCode: err.code,
      headers,
      body: JSON.stringify(err),
    };
    callback(null, response);
    return;
  }

  try {
    const data = await fetchTweet(opts);
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
    callback(null, response);

  } catch (err) {
    const statusCode = errorToStatusCode(err);
    const error = Array.isArray(err) ? err[0] : err;
    const response = {
      statusCode,
      headers,
      body: JSON.stringify(error),
    };
    callback(null, response);
  }
};

if (require.main === module) {
  main();
}
