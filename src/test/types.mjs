import * as iguazuRestTypes from '../types.mjs';

const  {
  LOAD_STARTED,
  LOAD_COLLECTION_STARTED,
  CREATE_STARTED,
  UPDATE_STARTED,
  DESTROY_STARTED,
  LOAD_FINISHED,
  LOAD_ERROR,
  LOAD_COLLECTION_FINISHED,
  LOAD_COLLECTION_ERROR,
  CREATE_FINISHED,
  CREATE_ERROR,
  UPDATE_FINISHED,
  UPDATE_ERROR,
  DESTROY_FINISHED,
  DESTROY_ERROR,
  RESET,
} = iguazuRestTypes;

const iguazuRestTypesArray = Object.keys(iguazuRestTypes).map(key => iguazuRestTypes[key]);

console.log(iguazuRestTypesArray);
