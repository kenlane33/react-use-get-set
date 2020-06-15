import { forEachInHash } from "../helpers/iterators.js"
import { useGetSetState } from "./useGetSetState.js"
import { addToggleToState } from "./useToggleState.js"

//-----------/////////////////---------------------------------o
export const useCheckboxState = obj => addCheckboxToState( useGetSetState( obj ) )

//-----------///////////////////---------------------------------o
export const addCheckboxToState = obj => {
  addToggleToState( obj )
  obj.bindToInputTag = {}

  const makeBindInput = ( k, v ) => ({
    type:"checkbox",
    value: k, 
    checked: obj[k],
    onChange: (ev) => {
      obj.toggle[k](); 
      console.log( 'obj.' + k + '.checked=' + obj[k] ); 
    }
  })
  forEachInHash( obj.initVals, ( [ k, v ] ) => {
    obj.bindToInputTag[k] = makeBindInput(k,v)
  })
  return obj
} // Usage: ------------------------------
