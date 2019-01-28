/*
 * Copyright 2018 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { Map as iMap } from 'immutable';

import config from './config';
import {
  getResourceIdHash,
  getCollectionIdHash,
  getQueryHash,
} from './helpers/hash';

export function resourceIsLoaded({ resource, id }) {
  return (state) => {
    const resourceState = config.getToState(state).get(resource, iMap());
    const idHash = getResourceIdHash(id);
    return !!resourceState.getIn(['items', idHash]) || !!resourceState.getIn(['error', idHash]);
  };
}

export function getResource({ resource, id }) {
  return (state) => {
    const resourceState = config.getToState(state).get(resource, iMap());
    const error = resourceState.getIn(['error', getResourceIdHash(id)]);
    if (error) return error;

    const item = resourceState.getIn(['items', getResourceIdHash(id)]);
    return iMap.isMap(item) ? item.toJS() : item;
  };
}

export function resourceIsLoading({ resource, id }) {
  return state => !!config.getToState(state).getIn([resource, 'loading', getResourceIdHash(id)]);
}

export function getResourceLoadPromise({ resource, id }) {
  return state => config.getToState(state).getIn([resource, 'loading', getResourceIdHash(id)]);
}

// query the state.resources[resource].collections for idHash->queryHash
export function collectionIsLoaded({ resource, id, opts }) {
  return (state) => {
    const idHash = getCollectionIdHash(id);
    const queryHash = getQueryHash(opts);
    // !! syntax is needed to counter "undefined"???
    return !!config.getToState(state).getIn([resource, 'collections', idHash, queryHash]);
  };
}

export function getCollection({ resource, id, opts }) {
  return (state) => {
    // if src/index has a configureIguazuREST override function, the 
    // value will be taken from there. config.getToState(state) returns a function;
    // .get(resource) returns a function property resource. 
    const getToState = config.getToState(state);

    // get() - immutable. If resource not found, return an empty object as immutable
    // where do I convert a js object to immutable object ???

    // returns: state.resources + name of the resource, ex: posts as an object of immutable.
    // if resource=="posts", the resourceState value will be state.resources.posts
    const resourceState = getToState.get(resource, iMap());

    // to query immutable hash, need idHash and query hash

    // state.resource.
    const idHash = getCollectionIdHash(id);
    const queryHash = getQueryHash(opts);

    /* the redux store has the following structure:
    state.resources.posts.collections
    state.resources.posts.items
    */

    // check if there is an error state.resources.posts.collections.error
    const error = resourceState.getIn(['collections', idHash, queryHash, 'error']);
    // immutable swallows an error if property does not exist
    if (error) return error;

    // no error, get associatedIds as js array. If path does not exist, return an empty object of immutable with associatedIds[] property. Convert to js object
    const { associatedIds } =
      resourceState.getIn(['collections', idHash, queryHash], iMap({ associatedIds: [] })).toJS();

    // return a new array of js objects from state.resources.posts.items[resourceId] - hash id.  
    return associatedIds.map(resourceId => resourceState.getIn(['items', resourceId]).toJS());
  };
}

export function collectionIsLoading({ resource, id, opts }) {
  return state => !!config.getToState(state).getIn([resource, 'loading', getCollectionIdHash(id), getQueryHash(opts)]);
}

export function getCollectionLoadPromise({ resource, id, opts }) {
  return state => config.getToState(state).getIn([resource, 'loading', getCollectionIdHash(id), getQueryHash(opts)]);
}
