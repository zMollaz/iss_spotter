const { nextISSTimesForMyLocation, printPasses } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passes) => {
    printPasses(passes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });