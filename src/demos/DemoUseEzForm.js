import React, { useState } from "react"
import { useEzForm } from "../hooks/useEzForm"
import { DemoHeader } from './DemoHeader'
import { AutoForm, Fielder } from '../components/AutoForm'

//===========//////////////========================o
export const DemoUseEzForm = () => {
  let [submittedTxt, setSubmitted] = useState('_')
  let [seePw, setSeePw] = useState(true)
  //-------------------------------------o
  const initVals = {
    phone: '999-123-4567', // just an initial value
    first:['Gee', {style:{color:'blue'}, label:'First name==>'}], // [0] is intial value, [1] is obj to spread onto the ezForm.inputBinds.first
    last:'Willikars',      // just an initial value
    pw: ['12345', {type:'password'}] // [0] is intial value, [1] is obj to spread onto the ezForm.inputBinds.pw
  }
  const ezForm = useEzForm(
    initVals,
    (x)=>{ 
      console.log(x)
      setSubmitted( JSON.stringify(x) )
    }
  )
  const {inputs, doChange, doSubmit, inputBinds, bindForm} = ezForm
  //-------------------------------------o
  return (
    <div>
      <DemoHeader demoTxt='DemoUseEzForm' useTxt='useEzForm()' />
      {/* ------------------------------------------ */}
      <form onSubmit={doSubmit}>

        <label> Phone:
          {/* Automatic style of putting props on input */}
          <input {...inputBinds.phone} />
        </label><br />

        <label> First:
          {/* Automatic style of putting props on input */}
          <input {...inputBinds.first} />
        </label><br />

        <label> Last:
          {/* Manual style of putting props on input */}
          <input value={inputs.last} name={'last'} onChange={doChange} type="text" />
        </label><br />

        <label> Pw:
          {/* === Overriding props to unmask a password ===
            Later tag props override those spread earlier on the tag. 
            Ternary on seePw bool lets us optionally override the 
            type='password' from the bindInput.pw with type:'text' */}
          <input {...inputBinds.pw} {...( (seePw) ? {type:'text'} : {} )} />

          <input type='checkbox' checked={seePw} onChange={()=>setSeePw( ! seePw )}/>
          <span style={{fontSize:9}}>See</span>

        </label><br />


        <input type="submit" value="Submit" />

      </form>      
      <br />
      {/* ------------------------------------------ */}
      <form onSubmit={doSubmit}>
        <Fielder label='Phone: ' {...inputBinds.phone} />
        <Fielder label='OVERRIDDEN_BY_BIND' {...inputBinds.first} />
        <Fielder label='Last: ' name='last'   inputs={inputs} onChange={doChange}/>
        <Fielder label='Password: ' {...inputBinds.pw} type='password'/>
        <input type="submit" value="Submit" />
      </form>
      <br />
      {/* ------------------------------------------ */}
      {/* <AutoForm fields={initVals} inputs={inputs} onChange={doChange}/> */}
      <AutoForm fields={initVals} inputBinds={inputBinds} bindForm={bindForm}/>
      <br />
      {/* ------------------------------------------ */}
      <AutoForm fields={initVals} {...ezForm} />
      <br />
      <div>Submitted data:</div>
      <pre style={{margin:0, fontSize:10}}>
        {submittedTxt && submittedTxt.split(',').join(',\n')}
      </pre>
      <br /><br />
    </div>
  )
}
