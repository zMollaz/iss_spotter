const {nextISSTimesForMyLocation} = require('./iss');

nextISSTimesForMyLocation((error) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
});