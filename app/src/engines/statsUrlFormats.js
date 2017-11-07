const util = require('util');
const sha256 = require('js-sha256');

const apiKey = 'hrzct5ze45rs6vd5f7nuuyfn';
const secret = 'FUcabTvbbG';

const formats = {
  footballLiveFormat: 'http://api.stats.com/v1/stats/soccer/epl/events/%s/?accept=json&linescore=true&pbp=true&languageId=15&api_key=%s&sig=%s',
  basketballLiveFormat: 'http://api.stats.com/v1/stats/basketball/nba/events/%s?languageId=15&pbp=true&accept=json&api_key=%s&sig=%s',
  basketballLiveBoxFormat: 'http://api.stats.com/v1/stats/basketball/nba/events/%s?languageId=1&accept=json&pbp=true&box=true&api_key=%s&sig=%s',
  basketballScheduleFormat: 'http://api.stats.com/v1/stats/basketball/nba/events/?languageId=15&startDate=%s&endDate=%s&accept=json&api_key=%s&sig=%s',
  footballScheduleFormat: 'http://api.stats.com/v1/stats/soccer/epl/scores/?date=%s&accept=json&api_key=%s&sig=%s',
  baseballMlbScheduleFormat: 'http://api.stats.com/v1/stats/baseball/mlb/events/?languageId=15&startDate=%s&endDate=%s&accept=json&api_key=%s&sig=%s',
  baseballNpbScheduleFormat: 'http://api.stats.com/v1/stats/baseball/npb/events/?languageId=15&startDate=%s&endDate=%s&accept=json&api_key=%s&sig=%s',
  baseballMlbLiveFormat: 'http://api.stats.com/v1/stats/baseball/mlb/events/%s?box=true&pbp=true&tvl=true&linescore=true&languageId=15&accept=json&api_key=%s&sig=%s',
  hockeyNhlLiveFormat: 'http://api.stats.com/v1/stats/hockey/nhl/events/?languageId=15&startDate=%s&endDate=%s&accept=json&api_key=%s&sig=%s',
};

// signature maker
const makeSignature = (apiKey, secret) => (sha256(apiKey + secret + Math.floor((new Date().getTime()) / 1000)));

module.exports = {
  getSignature: makeSignature(apiKey, secret),
  getApikeySignature: `&api_key=${apiKey}&sig=${makeSignature(apiKey, secret)}`,
  getBasketballScheduleUrl: (startDate, endDate) => (util.format(formats.basketballScheduleFormat, startDate, endDate, apiKey, makeSignature(apiKey, secret))),
  getBasketballLiveUrl: eventId => (util.format(formats.basketballLiveFormat, eventId, apiKey, makeSignature(apiKey, secret))),
  getBasketballLiveBoxUrl: eventId => util.format(formats.basketballLiveBoxFormat, eventId, apiKey, makeSignature(apiKey, secret)),
  getFootballLiveUrl: eventId => (util.format(formats.footballLiveFormat, eventId, apiKey, makeSignature(apiKey, secret))),
  getBaseballMlbScheduleUrl: (startDate, endDate) => (util.format(formats.baseballMlbScheduleFormat, startDate, endDate, apiKey, makeSignature(apiKey, secret))),
  getBaseballNpbScheduleUrl: (startDate, endDate) => (util.format(formats.baseballNpbScheduleFormat, startDate, endDate, apiKey, makeSignature(apiKey, secret))),
  getBaseballMlbLiveUrl: eventId => (util.format(formats.baseballMlbLiveFormat, eventId, apiKey, makeSignature(apiKey, secret))),
  getHockeyNhlLiveUrl: (startDate, endDate) => (util.format(formats.hockeyNhlLiveFormat, startDate, endDate, apiKey, makeSignature(apiKey, secret))),

};
