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
    phone:'999-123-4567',
    first:['Gee', {style:{color:'blue'}, label:'First name==>'}],
    last:'Willikars',
    pw: ['12345', {type:'password'}]
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
          {/* <input value={inputs.phone} name={'phone'} onChange={doChange} type="text" /> */}
          <input {...inputBinds.phone} />
        </label><br />

        <label> First:
          {/* <input value={inputs.first} name={'first'} onChange={doChange} type="text" /> */}
          <input {...inputBinds.first} />
        </label><br />

        <label> Last:
          <input value={inputs.last} name={'last'} onChange={doChange} type="text" />
        </label><br />

        <label> Pw:
          {/* <input value={inputs.password} name={'password'} onChange={doChange} type="password" /> */}
          {/* Later props override those spread in the earlier ones. 
             Ternary on type:'text' lets us optionally override the 
             type='password' from the bindInput('pw') spread of props
          */}
          <input {...inputBinds.pw} {...((seePw)?{type:'text'}:{})} />
          <input type='checkbox' checked={seePw} onChange={()=>setSeePw(!seePw)}/>
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
