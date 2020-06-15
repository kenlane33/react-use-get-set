import { useState } from "react"
import { forEachInHash } from "../helpers/iterators.js"

//-----------//////////////----------------------------o
export const addGetSetProp = (obj, name, setter, val) => {
  Object.defineProperty(obj, name, {
    enumerable: true,
    set: x => setter(x),
    get: () => val
  })
} // Usage: ----------
//   var obj={};
//   var nullProofFn = (x) => { if( x === null ){ this.val=x; return x; } else return this.val; }
//   addGetSetProp( obj, 'fun', nullProofFn, 42 )
//   obj.fun = null   //   <----   no change to val
//   obj.fun = 6      //    <---   val correctly changes
// Also great when paired with React hooks
//   const [val,setter] = useState( initVal )
//   addGetSetProp( obj, stateNm, setter, val )
//

//-----------///////////////----------------------------o
export const useGetSetState = hash => {
  const obj = { initVals: {} }
  const lockedUseState = useState
  forEachInHash(hash, ([key, initVal]) => {
    obj.initVals[key] = initVal
    const [value, setter] = lockedUseState(initVal)
    addGetSetProp(obj, key, setter, value)
  })
  return obj
} // Usage: ------------------------------
// var st = useGetSetState({fun:2, sun:'hot'})
// return (<div>
//   <div>Fun: {st.fun} / Sun:{st.sun} </div>
//   <div>First fun was {st.initVals.fun}</div>
//   <button onClick={()=> st.fun+=1}> One More Fun than {st.fun} </button>
//   <button onClick={()=> st.fun = st.initVal.fun }>Reset Fun</button>
// </div>)
//------------