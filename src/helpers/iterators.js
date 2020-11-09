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
export const isObj = (o) => (!!o && Object.prototype.toString.call(o) === '[object Object]')
//===========//////////===========================O
//           flattenObj
const digFlat = (o, k, v, prefix) => (isObj(v)) ? flattenObj(v, prefix+k+'.', o) : {[prefix+k]:v}
export const flattenObj = (o, prefix='') => (
  Object.entries(o).reduce( (accum,[k,v])=>(
    {...accum, ...digFlat(accum, k, v, prefix)}
  ), {})
) // Usage: --------------------------
// const flattenMe = {a:{b:1,c:2, d:{g:7,h:8}}, q:1, r: 2, s:3, x:{y:9, z:99}}
// flattenObj(flattenMe)
// => 
// {
//   "a.b":   1,
//   "a.c":   2,
//   "a.d.g": 7,
//   "a.d.h": 8,
//   "q":     1,
//   "r":     2,
//   "s":     3,
//   "x.y":   9,
//   "x.z":   99
// }
const {log} = console

//===========/////////===========================O
export const cloneObj = (obj_in) => {
  if (!!obj_in || !isObj(obj_in)) return obj_in
  let newObj = Array.isArray(obj_in) ? [] : {}
  for (let key in obj_in) {
    newObj[key] = cloneObj(obj_in[key])
  }
  return newObj
}// Usage: --------------------------
// log( JSON.stringify(cloneObj({a:{b:1,c:2, d:{x:1}}, g:7, h:8}))) // {"a":{"b":1,"c":2,"d":{"x":1}},"g":7,"h":8}

//===========////////===========================O
export const deepSet = (obj_in, path, val, keys=path.split('.')) => {
  let o = cloneObj(obj_in), rootO = o, n = keys.length
  const isLast = (i)=>( i+1 === n )
  keys.forEach( (key, i)=>{
    o[key] = (isLast(i)) ? val : (o[key] || {})
    o = o[key]// dig into o at key
  })
  return rootO
} // Usage: --------------------------
const a = {a:{b:1,c:2, d:{x:1}}, g:7, h:8}
log( JSON.stringify(a) )                        //  {"a":{"b":1,"c":2,"d":{"x":1}},"g":7,"h":8}
log( JSON.stringify(deepSet(a,'a.d.y', 999)) )  //  {"a":{"b":1,"c":2,"d":{"x":1,"y":999}},"g":7,"h":8}
log( JSON.stringify(deepSet(a,'a.p.q', 999)) )  //  {"a":{"b":1,"c":2,"d":{"x":1,"y":999},"p":{"q":999}},"g":7,"h":8}
log( JSON.stringify(deepSet({}, 't.m.l', 42)) ) //  {"t":{"m":{"l":42}}}

//===========//////////===========================O
export const unFlattenObj = (o) => {
  let newO = {}
  Object.entries(o).forEach( ([path, val]) => {
    newO = deepSet(newO, path, val)
  })
  return newO
}
// Usage: --------------------------
const unFlattenMe = {
  "a.b":   1,
  "a.c":   2,
  "a.d.g": 7,
  "a.d.h": 8,
  "q":     1,
  "r":     2,
  "s":     3,
  "x.y":   9,
  "x.z":   99
}
console.log( 'unFlattenObj()', unFlattenObj(unFlattenMe) )

//===========//////////===========================O
// export const unFlattenObj = (o) => {
//   let newO = {}
//   Object.entries(o).forEach( ([multiKey, val]) => {
//     // baseSet(newO, multiKey, val)
//     const keys = multiKey.split('.')
//     log('unFlattenObj()', keys)
//     let isLast = (i)=> ( i == (keys.length-1) )

//     let addSpot = newO[keys[0]]
//     let addFn = (x) => newO[keys[0]] = x
//     keys.forEach( (key, i)=>{
//       //   addHere = (addHere && addHere[key]) || {}
//       if (isLast(i)) { addFn(val) }
//       else {
//         addFn(key)
//         addFn = (x) => addSpot[key] = val
//         addSpot = addSpot[key] || {}
//       }
//     })
//   })
//   return newO
// } // Usage: --------------------------
// const unFlattenMe = {
//   "a.b":   1,
//   "a.c":   2,
//   "a.d.g": 7,
//   "a.d.h": 8,
//   "q":     1,
//   "r":     2,
//   "s":     3,
//   "x.y":   9,
//   "x.z":   99
// }
// console.log( 'unFlattenObj()', unFlattenObj(unFlattenMe) )
// const flattenMe = {a:{b:1,c:2, d:{g:7,h:8}}, q:1, r: 2, s:3, x:{y:9, z:99}}
// flattenObj(flattenMe)
// => 
// {
//   "a.b":   1,
//   "a.c":   2,
//   "a.d.g": 7,
//   "a.d.h": 8,
//   "q":     1,
//   "r":     2,
//   "s":     3,
//   "x.y":   9,
//   "x.z":   99
// }