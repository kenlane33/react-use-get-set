
const {log,error} = console;

const fetchify = async (url, hash, callbackFn, options = {}, fetchFn) => {
  fetchFn = fetch;
  log('fetchify() ', 'url:', url, 'hash:', hash, 'opts:', options);
  try {
    const fetchOpts = { body: hash && JSON.stringify(hash), ...options };
    const resp = await fetchFn(url, fetchOpts);
    // const resp = {...resp0, ok:false}
    if (!resp.ok){
      log('fetchify.ERROR', resp)
      throw(resp)
    } else {
      const respHash = await resp.json()
      callbackFn(respHash, resp) // TEST: {...resp, ok:false} )
    }
  }
  catch (resp) {
    error(resp)
    callbackFn({error:`${resp.name} / ${resp.message}`}, resp) // set it back to original hash
    // throw new Error(`ERROR: url:${url} | ${ex.message} | stack: ${ex.stack}`)

  }
};
export const fakeFetch = (secs, bodyAsHash = null) => (url, options) => {
  log('fakeFetch() ', url);
  return new Promise((fn) => setTimeout(fn, secs * 1000,
    {
      ok: true,
      statusText: 'OK',
      body: JSON.stringify(bodyAsHash),
      json: () => bodyAsHash // returns hash
    }
  ));
};
export const fetchGet = (url, callbackFn, options = {}, fetchFn = fetch) => (
  fetchify(url, undefined, callbackFn, { ...options, method: 'GET' }, fetchFn)
);
export const fetchPut = (url, hash, callbackFn, options = {}, fetchFn = fetch) => (
  fetchify(url, hash, callbackFn, { ...options, method: 'PUT' }, fetchFn)
);
export const fetchDelete = (url, callbackFn, options = {}, fetchFn = fetch) => (
  fetchify(url, undefined, callbackFn, { ...options, method: 'DELETE' }, fetchFn)
);
