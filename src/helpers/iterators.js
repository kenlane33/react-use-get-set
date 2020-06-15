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

export const callArrFunc = ( arrFn ) => {
  const [func,...funcParams] = arrFn
  return func( ...funcParams )
}// Usage: ------------------------------
// const [ a, setA ] = callArrFunc( [ useState, 42 ] )

