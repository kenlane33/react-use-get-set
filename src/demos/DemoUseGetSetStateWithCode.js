import React from 'react'
import { useGetSetState } from '../hooks/useGetSetState'
import { ColorBorders } from '../components/ColorBorders'
import { PrismCode } from "../components/PrismCode"
import { DemoHeader } from './DemoHeader'


//====////////////=========================O
const ExampleComp = () => {
  var st = useGetSetState({ fun:2, sun:'hot' })
  return (
    <div>
      <div>Fun: {st.fun} / Sun:{st.sun} </div><br/>
      <div>First fun was {st.initVals.fun}</div><br/>
      <button onClick={()=> st.fun+=1}> One More Fun than {st.fun} </button>{' '}
      <button onClick={()=> st.fun = st.initVals.fun }>Reset Fun</button>
    </div>
  )
}

//====////////////=========================O
export const TheCode = () => (
  <div style={{backgroundColor:'#011627', padding: 20 }}>
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
  var st = useGetSetState({ fun:2, sun:'hot' })
  return (
    <div>
      <div>Fun: {st.fun} / Sun:{st.sun} </div><br/>
      <div>First fun was {st.initVals.fun}</div><br/>
      <button onClick={()=> st.fun+=1}> One More Fun than {st.fun} </button>{' '}
      <button onClick={()=> st.fun = st.initVals.fun }>Reset Fun</button>
    </div>
  )
}
  `.trim()} />
  </div>
)
//====////////////=========================O
export const DemoUseGetSetStateWithCode = () => (
  <div>
    <DemoHeader demoTxt='DemoUseGetSetStateWithCode' useTxt='useGetSetState()' />

    <ColorBorders colors={['grey']} >
      <TheCode />
      <ColorBorders colors={['red','orange','yellow', 'orange']} >
        <ExampleComp />
      </ColorBorders>
    </ColorBorders>
    <br />
    <br />
  </div>
  )
