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

import merge from 'deepmerge';

import * as types from '../types';
import { buildFetchUrl } from '../helpers/url';
import config from '../config';
import { waitAndDispatchFinished } from './asyncSideEffects';

function startsWith(string, target) {
  return String(string).slice(0, target.length) === target;
}

async function extractDataFromResponse(res) {
  const contentType = res.headers.get('Content-Type');
  const isJson = startsWith(contentType, 'application/json');
  // 
  const body = await res[isJson ? 'json' : 'text'](); //if (isJson) await res['json'](); where json is a function on the res object. Get it and invoke it
  const { status } = res;

  return res.ok ?
    Promise.resolve(body) :
    Promise.reject(Object.assign(new Error(`${res.statusText} (${res.url})`), { body, status }));
}

const actionTypeMethodMap = {
  LOAD: 'GET',
  LOAD_COLLECTION: 'GET',
  CREATE: 'POST',
  UPDATE: 'PUT',
  DESTROY: 'DELETE',
};

// async/ await keyword makes the function asynchrnonous. All instructions before first await are executed synchronously. When await is found, the function interrupts for asunc process, 
// and the next instruction after the function is invoked
async function getAsyncData({ resource, id, opts, actionType, state }) {
  // get configuration object
  const { resources, defaultOpts, baseFetch } = config;
  // access fetch function. It will return an object with url and opts. Pass in params for transformData.
  const { url, opts: resourceOpts } = resources[resource].fetch(id, actionType, state);

  // Merges the enumerable attributes(ones that can be accessed with Object.keys()) of two or more objects deeply.
  // if actionType is the only param populated, the fetchOpts will be {"method":"GET"}
  const fetchOpts = merge.all([
    // httpMethod based on actionType passed
    { method: actionTypeMethodMap[actionType] },
    defaultOpts || {},
    resourceOpts || {},
    opts || {},
  ]);

  
  const fetchUrl = buildFetchUrl({ url, id, opts: fetchOpts });

  // baseFetch is a property in the iguazu-rest config.js. Its value points to the fetch() in the browser.
  // so, when baseFetch is called, the fetch function 
  // when called, a "cors" response is returned
  const res = await baseFetch(fetchUrl, fetchOpts);      // async process starts
  const rawData = await extractDataFromResponse(res);

  // get transformData function 
  const { transformData } = config.resources[resource];
  const data = transformData ? transformData(rawData, { id, opts, actionType }) : rawData;

  return data;
}

export default function executeFetch({ resource, id, opts, actionType }) {
  return (dispatch, getState) => {
    // this is the async function. The next instruction will be called immediately after await part is reached
    const promise = getAsyncData({ resource, id, opts, actionType, state: getState() });
    // dispatch to the the reducer. next two dispatches are executed before the previous call ends (getAsyncData is asynchronous)
    dispatch({ type: types[`${actionType}_STARTED`], resource, id, opts, promise });
    dispatch(waitAndDispatchFinished(promise, { type: actionType, resource, id, opts }));

    return promise;
  };
}
