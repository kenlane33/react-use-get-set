import { forEachInHash } from "../helpers/iterators.js"
import { useGetSetState } from "./useGetSetState.js"

//-----------///////////////---------------------------------o
export const useToggleState = obj => addToggleToState( useGetSetState( obj ) )

//-----------/////////////////---------------------------------o
export const addToggleToState = obj => {
  obj.toggle = {}
  obj.turnOn = {}
  obj.turnOff = {}

  forEachInHash(obj.initVals, ([k,v]) => {
    obj.toggle[k] = () => (obj[k] = ! obj[k]) // flips tru to false and VV
    obj.turnOn[k] = () => (obj[k] = true) 
    obj.turnOff[k] = () => (obj[k] = false)
  })
  obj.allOff     = () => forEachInHash(obj.initVals, ([k, v]) => (obj[k] = false   ))
  obj.allOn      = () => forEachInHash(obj.initVals, ([k, v]) => (obj[k] = true    ))
  obj.toggleAll  = () => forEachInHash(obj.initVals, ([k, v]) => (obj[k] = !obj[k] ))
  return obj
} // Usage: ------------------------------
// const st = addToggleToState(
//   useGetSetState({ 
//     lamp: true, 
//     isLoading: false, 
//     menuIsOpen: false 
//   })
// )
// st.turnOff.lamp()
// st.turnOn.isLoading()
// st.allOff()
// st.toggle.menuIsOpen()
