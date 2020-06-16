import React from "react"
import { useGetSetState } from "./hooks/useGetSetState.js"
import { DemoUseResetState } from './demos/DemoUseResetState'
import { DemoUseCheckboxState } from './demos/DemoUseCheckboxState'
import { DemoUseToggleState } from './demos/DemoUseToggleState'
import { DemoUseGetSetState } from './demos/DemoUseGetSetState'
import { PrismCode } from "./components/PrismCode"
import { ColorBorders } from './components/ColorBorders'
import "./styles.css"

//====////////////=========================O
const ExampleComp = () => {
  var st = useGetSetState({fun:2, sun:'hot'})
  return (
    <div>
      <div>Fun: {st.fun} / Sun:{st.sun} </div><br/>
      <div>First fun was {st.initVals.fun}</div><br/>
      <button onClick={()=> st.fun+=1}> One More Fun than {st.fun} </button>{' '}
      <button onClick={()=> st.fun = st.initVals.fun }>Reset Fun</button>
    </div>
  )
}

//======================////===============O
export default function App() {
  return (
    <div className="App">


      <div style={{backgroundColor:'#011627', padding: 20}}>
        <PrismCode stl={{ textAlign: "left" }} language='js' code=
          {`
  export const useGetSetState = hash => {
    const obj = { initVals: {} }
    const lockedUseState = useState
    forEachInHash(hash, ([key, initVal]) => {
      obj.initVals[key] = initVal
      const [value, setter] = lockedUseState(initVal)
      addGetSetProp(obj, key, setter, value)
    })
    return obj
  }

  const ExampleComp = () => {
    var st = useGetSetState({fun:2, sun:'hot'})
    return (
      <div>
        <div>Fun: {st.fun} / Sun:{st.sun} </div>
        <div>First fun was {st.initVals.fun}</div>
        <button onClick={()=> st.fun+=1}> One More Fun than {st.fun} </button>
        <button onClick={()=> st.fun = st.initVal.fun }>Reset Fun</button>
      </div>
    )
  }

    `.trim()} />
    </div>
    <ColorBorders colors={['red','orange','#dd6', '#4f4', '#99d']} >
      <ExampleComp />
    </ColorBorders>

    <DemoUseGetSetState />
    <DemoUseToggleState />
    <DemoUseResetState />
    <DemoUseCheckboxState />
    
  </div>
  )
}
