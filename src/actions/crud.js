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

import {
  resourceIsLoaded,
  getResource,
  resourceIsLoading,
  getResourceLoadPromise,
  collectionIsLoaded,
  getCollection,
  collectionIsLoading,
  getCollectionLoadPromise,
} from '../selectors';
import executeFetch from './executeFetch';

export function loadResource({ resource, id, opts, forceFetch }) {
  return (dispatch, getState) => {
    const state = getState();
    let promise;
    if (resourceIsLoaded({ resource, id })(state) && !forceFetch) {
      const data = getResource({ resource, id })(state);
      promise = data instanceof Error ? Promise.reject(data) : Promise.resolve(data);
    } else if (resourceIsLoading({ resource, id })(state) && !forceFetch) {
      promise = getResourceLoadPromise({ resource, id })(state);
    } else {
      promise = dispatch(executeFetch({ resource, id, opts, actionType: 'LOAD' }));
    }

    return promise;
  };
}

/*
three possible scenarios:
1) collection is loaded
2) collection is being loaded
3) collection has not been attempted to be loaded
*/
export function loadCollection({ resource, id, opts, forceFetch }) {
  return (dispatch, getState) => {
    const state = getState();
    let promise;
    if (collectionIsLoaded({ resource, id, opts })(state) && !forceFetch) {
      // return colection from cache
      const data = getCollection({ resource, id, opts })(state);
      promise = data instanceof Error ? Promise.reject(data) : Promise.resolve(data);
    } else if (collectionIsLoading({ resource, id, opts })(state) && !forceFetch) {
      // the call has been issued, return promise
      promise = getCollectionLoadPromise({ resource, id, opts })(state);
    } else {
      // first time thru or if forceFetch is set
      promise = dispatch(executeFetch({ resource, id, opts, actionType: 'LOAD_COLLECTION' }));
    }

    return promise;
  };
}

export function createResource({ resource, id, opts }) {
  return dispatch => dispatch(executeFetch({ resource, id, opts, actionType: 'CREATE' }));
}

export function updateResource({ resource, id, opts }) {
  return dispatch => dispatch(executeFetch({ resource, id, opts, actionType: 'UPDATE' }));
}

export function destroyResource({ resource, id, opts }) {
  return dispatch => dispatch(executeFetch({ resource, id, opts, actionType: 'DESTROY' }));
}
