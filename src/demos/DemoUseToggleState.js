import React from "react"
import {useToggleState} from '../hooks/useToggleState'
import {mapHash} from '../helpers/iterators.js'
import {DemoHeader} from './DemoHeader'

//====///////////==========================O
export const DemoUseToggleState = () => {
  const togs = useToggleState({
    isFun: true,
    isLoading: false,
    hasError: true,
    navMenuOpen: true,
    pinPaneOpen: true,
    editPaneOpen: false,
  })
  
  const rgStl = (x)=>({style: {color: x ? 'green':'red'}})

  const Flagger = ({_key}) => {
    const isT = togs[_key]
    const tfSpan = <span {...rgStl(isT)}> {isT ? 'true' : 'false'} </span>
    return (
    <div>
       {_key} : {tfSpan} {" "}
       <button onClick={togs.turnOn[_key]} > On     </button>{" "}
       <button onClick={togs.turnOff[_key]}> Off    </button>{" "}
       <button onClick={togs.toggle[_key]} > Toggle </button>
    </div>
  )}
  return (
    <div style={{lineHeight:2}}>
      <DemoHeader demoTxt='DemoUseToggleState' useTxt='useToggleState()' />
      {/*---////--------------------------------------*/}
      <div>
        <span>Fun: {togs.isFun ? 'fun' : 'not fun'}</span>{" "}
        { !togs.isFun && <button onClick={togs.turnOn.isFun}>  :)  </button> } {" "}
        {  togs.isFun && <button onClick={togs.turnOff.isFun}> :(  </button> } {" "}
      </div>

      {mapHash( togs.initVals, ([k,v]) => <Flagger key={k} _key={k}/> ) }
      < br />

      {mapHash( togs.initVals, ([k,v]) => (
        <span key={k} {...rgStl( togs[k] )}> 
          { togs[k] ? ' Y ' : ' n ' }
        </span>
      ))}
      < br />< br />

    </div>
  )
}  