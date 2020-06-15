import React from "react"
import {useGetSetState} from '../hooks/useGetSetState'
import {DemoHeader} from './DemoHeader'

//====///////////==========================O
export const DemoUseGetSetState = () => {
  const st = useGetSetState(
  { 
    fun: 7,
    msg: "Hello",
    lamp: true
  })
  return (
    <div>
      <DemoHeader demoTxt='DemoUseGetSetState' useTxt='useGetSetState()' />

      {/*---////-------------------------------------*/}
      <div> Fun: ( {st.fun} 👀 {st.fun} ) </div>
      <button onClick={ () => st.fun += 1   }> More Fun  </button>{" "}
      <button onClick={ () => st.fun *= 2   }> Double Fun</button>{" "}
      <button onClick={ () => st.fun  = 0   }> Zero Fun  </button>
      < br />< br />
      {/*---////-------------------------------------*/}
      <div> Msg: {st.msg} </div>
      <button onClick={ () => st.msg += ' spam'}> More Spam </button>{" "}
      <button onClick={ () => st.msg  = ''     }> No Spam   </button>
      < br />< br />
      {/*---////-------------------------------------*/}
      <div> Lamp is {st.lamp ? "on 💡" : "off"} </div>
      <button onClick={ () => st.lamp = true    }> Lamp On     </button>{" "}
      <button onClick={ () => st.lamp = false   }> Lamp Off    </button>{" "}
      <button onClick={ () => st.lamp = !st.lamp}> Lamp Toggle </button>
      < br />< br />
    </div>
  )
}
