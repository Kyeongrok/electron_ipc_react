/*
  param1 json string
  return event json object
 */
exports.get = (string) => {
  const json = JSON.parse(string);
  const event = json.apiResults[0].league.season.eventType[0].events[0];
  return event;
};
