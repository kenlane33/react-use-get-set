import React from "react"
import { addResetToState } from "../hooks/useResetState"
import {useCheckboxState} from '../hooks/useCheckboxState'
import {mapHash} from '../helpers/iterators'
import {DemoHeader} from './DemoHeader'

//====////////////==========================O
export const DemoUseCheckboxState = () => {
  const checkSt = addResetToState( useCheckboxState(  {
    isPublic: true,
    userCanEdit: false,
  }))

  const Checker = (p) => (
    <div>
      <label>
        <input {...checkSt.bindToInputTag[p._key]} />
        {p.label || p._key} : {checkSt[p._key] ? 'true' : 'false'}
      </label>
    </div>
  )

  return (
    <div>
      <DemoHeader demoTxt='DemoUseCheckboxState' useTxt='useCheckboxState()' />

      {mapHash(checkSt.initVals, ([k,v]) => <Checker key = {k} _key={k} /> )}
      <br />
      ↕️ <br/>
      <br />
      <label> <input {...checkSt.bindToInputTag.isPublic} />
        Public
      </label> <br/>

      <label> <input {...checkSt.bindToInputTag.userCanEdit} />
        Allow Editing
      </label> <br /><br />

      <button onClick={checkSt.reset.isPublic}>    Reset isPublic </button>{" "}
      <button onClick={checkSt.reset.userCanEdit}> Reset userCanEdit </button>{" "}
      <button onClick={checkSt.resetAll}>          Reset ALL Checks </button>

      <br /><br />

    </div>
  )
}