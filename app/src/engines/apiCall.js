const fs = require('fs');
const request = require('request');

const httpRequest = (url) => new Promise((resolve, reject) => {
  request({
    url: url,
    method: 'GET',
  }, (error, response, body) => {
    console.log(body);
    resolve(body);

  });
});
exports.request = httpRequest;

