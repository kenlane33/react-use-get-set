import React from "react"
import ResetBtn from "../components/ResetBtn.js"
import { useResetState } from "../hooks/useResetState.js"
import {DemoHeader} from './DemoHeader'

const {log} = console;

//====///////////==========================O
export const DemoUseResetState = () => {
  const st = useResetState( // SAME AS:  addResetToState( useGetSetState({
  {
    fun: 7,
    msg: "Hello",
    lamp: true
  })

  const moreFun = () => (st.fun += 1)
  const moreMsg = () => (st.msg += ", world")
  const togLamp = () => (st.lamp = !st.lamp)
  const resetMsg = () => {
    log("bye world")
    st.reset.msg()
  }

  return (
    <div>
      <DemoHeader demoTxt='DemoUseResetState' useTxt='useResetState()' />
      {/*---////--------------------------------------*/}
      <div> Fun: ( {st.fun} 👀 {st.fun} ) </div>
      <button onClick={ moreFun }>               More Fun   </button>{" "}
      <button onClick={   () => st.fun *= 2   }> Double Fun </button>{" "}
      <button onClick={st.reset.fun}>            Reset Fun  </button>{" "}
      <ResetBtn _var="fun" st={st} />
      <br /><br />

      {/*---////-------------------------------------*/}
      <div> Msg: {st.msg} </div>
      <button onClick={moreMsg}>      More Msg     </button>{" "}
      <button onClick={st.reset.msg}> Reset Msg    </button>{" "}
      <button onClick={resetMsg}>  Reset Msg & Log </button>{" "}
      <ResetBtn _var="msg" st={st} />
      <br /><br />
      {/*---/////--------------------------------------*/}
      <div> Lamp is {st.lamp ? "on 💡" : "off"} </div>
      <button onClick={togLamp}> Tog Lamp {st.lamp ? "off" : "on"}</button>{" "}
      <button onClick={st.reset.lamp}> Reset Lamp </button>
      <br /><br />

      {/*---RESETS--------------------------------------*/}
      <button onClick={st.resetAll}> Reset ALL Above </button>{" "}
      <button onClick={ () => { 
        st.reset.fun(); 
        st.reset.msg(); 
      }}>
        Reset Fun & Msg
      </button>{" "}
      <button onClick={()=>{
        st.setVals({fun:7777, msg:'OooOOOOooo!', lamp:false})
      }}> setVals </button>{" "}
      <br /><br />
    </div>
  )
}
