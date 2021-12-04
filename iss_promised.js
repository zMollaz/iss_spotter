const request = require('request-promise-native');

const fetchMyIP = () => {
  return request ('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request (`http://ip-api.com/json/${ip}`)
}

const fetchISSFlyOverTimes  = (body) => {
  const coords = JSON.parse(body);
    
    return request (`https://iss-pass.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`)
}

const nextISSTimesForMyLocation = () => {
return fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then((body) => {
  const response = JSON.parse(body).response;
  return response;
});
};

const printPasses = (pases) => {
  for (let elem of pases) {
    const date = new Date(0);
    date.setUTCSeconds(elem.risetime);
    const duration = elem.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

module.exports = {
  nextISSTimesForMyLocation,
  printPasses
 };