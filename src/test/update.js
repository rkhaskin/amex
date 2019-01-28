const { Map }  = require('immutable');

const state = Map();

 
const initialResourceState = Map({
    items: Map(),
    collections: Map(),
    loading: Map(),
    isCreating: false,
    updating: Map(),
    destroying: Map(),
  });

  const objTo = {
      "loading": {
          12345: {
              67890 : Map()
          }
      }
  }

 // const updateTo = Map(objTo);
 // console.log(updateTo.toJS());


//   const loadingObj = state.update('loading', map => {
//     console.log("Map = ", map);
//     const getIn = map.getIn([collectionIdHash, queryHash], "XXXXXX");
//     const setIn = map.setIn([collectionIdHash, queryHash], promise);
//     return setIn; 
// });


// const state2 = state.update("loading", map => {
//     console.log("map", map);
//     return map.setIn(["12345", "67890"], Promise.resolve());
// });

const state2 = state.update("posts", initialResourceState, map => {
    const setIn = map.setIn(["aaaaaaa", "bbbbbbbb"], Promise.resolve());
    return setIn; 
});

console.log(state2.toJS());

// post must already exist if not set is not specified
// const state3 = state2.update("loading", map => {
//     return map.setIn(["12345", "67890"], Promise.resolve());
// });

// console.log(state3.toJS());
 //const orig2 = state.update("posts", );
 //console.log(orig2.toJS());


/*
 return state.update(
    action.resource,
    initialResourceState,
    resourceState => resourceReducer(resourceState, action)
  );
  */