import React, {useState} from "react"
import { useEzForm } from "../hooks/useEzForm"
import {DemoHeader} from './DemoHeader'

export const DemoUseEzForm = () => {
  const initVals = {
    phone:'999-123-4567',
    first:'Gee',
    last:'Willikars',
  }
  let [submittedTxt, setSubmitted] = useState('_')
  const {inputs, doChange, doSubmit} = useEzForm(
    initVals,
    (x)=>{ 
      console.log(x)
      setSubmitted( JSON.stringify(x) )
    }
  )

  //-------------------------------------o
  const Fielder = ({label, name})=>(
    <div>
      <label>
        {label}
        <input type="text" value={inputs[name]} name={name} onChange={doChange}/>
      </label><br />
    </div>
  )
  const AutoForm = ({fields}) =>(
    <form onSubmit={doSubmit}>
      {Object.keys(fields).map( k => (
        <Fielder key={k} label={k+': '} name={k} />
      ))}
      <input type="submit" value="Submit" />
    </form>
  )
  return (
    <div>
      <DemoHeader demoTxt='DemoUseEzForm' useTxt='useEzForm()' />
      <form onSubmit={doSubmit}>
        <label> Phone:
          <input value={inputs.phone} name={'phone'} onChange={doChange} type="text" />
        </label><br />
        <label> First:
          <input value={inputs.first} name={'first'} onChange={doChange} type="text" />
        </label><br />
        <label> Last:
          <input value={inputs.last} name={'last'} onChange={doChange} type="text" />
        </label><br />
        <input type="submit" value="Submit" />
      </form>      
      <br />
      
      <form onSubmit={doSubmit}>
        <Fielder label='Phone: ' name='phone' />
        <Fielder label='First: ' name='first' />
        <Fielder label='Last: ' name='last' />
        <input type="submit" value="Submit" />
      </form>
      <br />
      
      <AutoForm fields={initVals}/>
      <br />
      Submitted data: 
      <br />
      {submittedTxt}
      <br />
    </div>
  )
}
