import React, { useState } from "react"
import { useFetchGetPut } from "../hooks/useFetchGetPut"
import { DemoHeader } from './DemoHeader'
import { AutoForm } from '../components/AutoForm'
//===========//////////////========================o
export const DemoFetchGetPut = () => {
  let [submittedTxt, setSubmitted] = useState('_')
  // let [seePw, setSeePw] = useState(true)
  //-------------------------------------o
  const inputInitVals = {
    phone:'999-123-4567',
    first:['Gee', {style:{color:'blue'}, label:'First name==>'}],
    last:'Willikars',
    pw: ['12345', {type:'password'}]
  }
  const ezForm = useFetchGetPut(
    inputInitVals,
    (x)=>{ 
      console.log(x)
      setSubmitted( JSON.stringify(x) )
    }
  )
  // const {inputs, doChange, doSubmit, inputBinds} = ezForm

  //-------------------------------------o
  return (
    <div>

      <DemoHeader demoTxt='DemoUseFetchGetPut' useTxt='useFetchGetPut()' />

      <AutoForm fields={ezForm.inputs.vals} {...ezForm} />
      <br />

      <div>Submitted data:</div>
      <pre style={{margin:0, fontSize:10}}>
        {submittedTxt && submittedTxt.split(',').join(',\n')}
      </pre>
      <br /><br />

    </div>
  )
}
