const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).ip;
    callback(null, data);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const latitude = data.lat;
    const longitude = data.lon;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching timings for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const pases = JSON.parse(body).response;
    callback(null, pases);
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

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, pases) => {
        if (error) {
          return callback(error, null);
        }
        return printPasses(pases);
      });
    });
  });
};


module.exports = {
  nextISSTimesForMyLocation,
};