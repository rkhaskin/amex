const Immutable  = require('immutable');

const avengersMap = Immutable.Map({
  ironMan: 'Tony Stark',
  captainAmerica: 'Steve Rogers',
  blackWidow: 'Natasha Romanov'
});

// update a value on a specific key
const updatedAvengers = avengersMap.update('ironMan', (ironManValue) => {    // value for 'ironMan' is passed into a function
  // ironManValue is a JavaScript type - no need for Immutable functions to modify it
  return ironManValue + ' is ironMan';
});

// if the key exists, its value is passed into a function, and whetever is returned becomes the new value:
// { "ironMan": "Tony Stark is ironMan", "captainAmerica": "Steve Rogers", "blackWidow": "Natasha Romanov" }

// if the key does not exist, it is added and whetever is returned from the function becomes its value:
// { "ironMan": "Tony Stark", "captainAmerica": "Steve Rogers", "blackWidow": "Natasha Romanov", "ironMan2": "undefined is ironMan" }
console.log(updatedAvengers);