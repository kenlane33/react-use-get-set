import { useState } from "react"
import { forEachInHash } from "../helpers/iterators.js"

//-----------//////////////----------------------------o
export const addGetSetProp = (obj, name, initVal, setterFn) => {
  obj.vals = obj.vals || {} // ensure a vals hash
  obj.vals[name] = initVal // EX: obj.vals.life = 42 where name='life' and initVal=42
  Object.defineProperty(obj, name, {
    enumerable: true,
    // set: function(x){this.vals[name] = x},//setter ? (x=>setter(x)) : (function(x){this.val = x}),
    set: (x)=>{ setterFn && setterFn(x); obj.vals[name] = x },
    get: function(){ return obj.vals[name] },
  })
} // Usage: ----------
  // var obj={};
  // addGetSetProp( obj, 'fun', 42 )
  // obj.fun   // 42
  // obj.fun = 77
  // obj.fun   // 77
  // or
  //   var nullProofFn = (x) => { if( x === null ){ this.val=x; return x; } else return this.val; }
  //   addGetSetProp( obj, 'fun', 42, nullProofFn )
  //   obj.fun = null   //   <----   no change to val
  //   obj.fun = 6      //    <---   val correctly changes
  // Also great when paired with React hooks
  //   const [val,setter] = useState( initVal )
  //   addGetSetProp( obj, stateNm, val, setter )
  
//-----------///////////////----------------------------o
export const useGetSetState = hash => {
  const obj = { initVals:{}, vals:{} }
  const lockedUseState = useState
  forEachInHash(hash, ([key, initVal]) => {
    obj.initVals[key] = initVal
    const [value, setter] = lockedUseState(initVal)
    addGetSetProp(obj, key, value, setter)
  })
  // console.log('useGetSetState.obj=', obj )
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