//----//////////////----------------------------o
export const forEachInHash = (hash, fn) => { 
  Object.entries(hash).forEach(fn)
}
// Usage: --------
// var obj={fun:4,sun:2}
// forEachInHash( obj, ([k,v])=> obj[k] = v+1 )

//----//////////////----------------------------o
export const mapHash = (hash, fn) => { 
  return Object.entries(hash).map(fn)
}
// Usage: --------
// var obj={fun:4,sun:2}
// mapHash( obj, ([k,v])=> <span>{k} = {obj[k]}</span> )


//====//////////////////=====================O
export const makeThingForEachInHash = (obj, hash, thingNm, thingMaker ) => {
  obj[thingNm] = {} // EX: obj.binds
  const makeThing = ([k,v]) => { obj[thingNm][k] = thingMaker(k,v) } // EX: obj.binds.fun
  forEachInHash(hash, makeThing)
} // Usage: ------------------------------

//====//////////////////=====================O
export const makeFuncForEachInHash = (obj, hash, funcNm, funcMaker ) => {
  obj[funcNm] = {} // EX: obj.reset
  const makeFn = ([k,v]) => { obj[funcNm][k] = funcMaker(k,v) } // EX: obj.reset.fun()
  forEachInHash(hash, makeFn)
} // Usage: ------------------------------
// var obj = { hash: { fun: 4, sun: 2 } }
// makeFuncForEachInHash( obj, obj.hash, 'logMe', (k,v) => 
//   () => console.log( k + ' : ' + v )
// )
// obj.logMe.fun()
// return ( <div>
//   <button onClick={obj.logMe.fun}> Log Fun </button>
//   <button onClick={obj.logMe.sun}> Log Sun </button>
// </div>)

//====//////////////////=====================O
export const callArrFunc = ( arrFn ) => {
  const [func,...funcParams] = arrFn
  return func( ...funcParams )
}// Usage: ------------------------------
// const [ a, setA ] = callArrFunc( [ useState, 42 ] )

//====//////////////////=====================O
const setArrKV = (arr,i,k,v) => {
  if (arr[i]===undefined) arr[i] = {}
  arr[i][k] = v
}
//====//////////////////=====================O
export const ensureArr = (arr, fallback) => {
  arr = arr || fallback
  if (Array.isArray( arr )) return arr
  else if (typeof arr  === "object") return Object.keys(arr)
  else return [arr] 
}
//====//////////////////=====================O
export const unpackHashArrs = ( hash, hashArr = [] ) => {
  forEachInHash( hash, ([k,v])=>{
    ensureArr(v).forEach( ( x, i ) => setArrKV( hashArr, i, k, x ) )
  })
  return hashArr
} // Usage: --------------------------
// Think of getting a new, sparse hash per column
// unpackHashArrs( {
//   a:1, 
//   b:2, 
//   c:[6,7], 
//   d:[88,99,111] 
// } )
//> [{a:1, b:2, c:6, d:88}, {c:7, d:99}, {d:111}]

