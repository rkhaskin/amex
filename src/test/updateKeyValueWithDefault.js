const Immutable  = require('immutable');

const avengersMap = Immutable.Map({
  captainAmerica: 'Steve Rogers',
  blackWidow: 'Natasha Romanov'
});

const updatedAvengers = avengersMap.update('theHulk', 'Bruce Banner', (theHulkValue) => {
  return theHulkValue + ' Smash!';
});


console.log(updatedAvengers); // output: { "captainAmerica": "Steve Rogers", "blackWidow": "Natasha Romanov", "theHulk": "Bruce Banner Smash!" }

// if the key exists, the default value is ignored, and the key value is passed into a function: { "captainAmerica": "Steve Rogers", "blackWidow": "Natasha Romanov Smash!" }

const updatedAvengersExists = avengersMap.update('blackWidow', 'Bruce Banner', (keyValue) => {
  return keyValue + ' Smash!';
});


console.log(updatedAvengersExists);

