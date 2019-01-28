const Immutable  = require('immutable');

const avengersMap = Immutable.Map({
    ironMan: 'Tony Stark',
    captainAmerica: 'Steve Rogers',
    blackWidow: 'Natasha Romanov'
  });
  
  // entire map is passed into the update
  const updatedAvengers = avengersMap.update((avengers) => {
    // avengers is a Map, so we need to return the value from set() to change its values


    return avengers.set('ironMan2', 'is Tony Stark').set('captainAmerica', 'John Doe');   
    
    // key, value - key exists ? update : insert
    // updatedAvengers =  { "ironMan": "Tony Stark", "captainAmerica": "John Doe", "blackWidow": "Natasha Romanov", "ironMan2": "is Tony Stark" }
  });

  console.log(updatedAvengers);