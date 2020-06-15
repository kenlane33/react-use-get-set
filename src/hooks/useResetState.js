import { forEachInHash } from "../helpers/iterators.js"
import { useGetSetState } from "./useGetSetState.js"


//-----------///////////////---------------------------------o
export const useResetState = obj => addResetToState( useGetSetState( obj ) )

//-----------/////////////////---------------------------------o
export const addOneResetToObj = (obj, k) => {
  obj.reset[k] = () => (obj[k] = obj.initVals[k])
}

//-----------////////////////---------------------------------o
export const addResetToState = obj => {
  obj.reset = {}
  const addResetFuncForKey = ([k, v]) => {
    obj.reset[k] = () => (obj[k] = obj.initVals[k]) // calls prop setter via  =  to set it back to initVal
  }
  forEachInHash(obj.initVals, addResetFuncForKey)
  obj.resetAll = () =>
    forEachInHash(obj.initVals, ([k, v]) => (obj[k] = obj.initVals[k]))
  return obj
} // Usage: ------------------------------
