import React, { useState } from "react"
import { useEzForm } from "../hooks/useEzForm"
import { DemoHeader } from './DemoHeader'

//-------------------------------------o
const Fielder = ({label, name, inputs, onChange, ...rest}) => (
  <div>
    <label>
      {label}
      <input type="text" value={inputs[name]} name={name} onChange={onChange} {...rest}/>
    </label><br />
  </div>
)
//-------------------------------------o
const AutoForm = ({fields,bindInput}) => { 
  const {onSubmit} = bindInput()
  return(
  <form onSubmit={onSubmit}>
    {Object.keys(fields).map( k => (
      <Fielder key={k} label={k+': '} {...bindInput(k)} />
    ))}
    <input type="submit" value="Submit" />
  </form>
)}
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
  const {inputs, doChange, doSubmit, bindInput} = useEzForm(
    initVals,
    (x)=>{ 
      console.log(x)
      setSubmitted( JSON.stringify(x) )
    }
  )  
  //-------------------------------------o
  return (
    <div>
      <DemoHeader demoTxt='DemoUseEzForm' useTxt='useEzForm()' />
      {/* ------------------------------------------ */}
      <form onSubmit={doSubmit}>

        <label> Phone:
          {/* <input value={inputs.phone} name={'phone'} onChange={doChange} type="text" /> */}
          <input {...bindInput('phone')} />
        </label><br />

        <label> First:
          {/* <input value={inputs.first} name={'first'} onChange={doChange} type="text" /> */}
          <input {...bindInput('first')} />
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
          <input {...bindInput('pw')} {...((seePw)?{type:'text'}:{})} />
          <input type='checkbox' checked={seePw} onChange={()=>setSeePw(!seePw)}/>
          <span style={{fontSize:9}}>See</span>
        </label><br />


        <input type="submit" value="Submit" />

      </form>      
      <br />
      {/* ------------------------------------------ */}
      <form onSubmit={doSubmit}>
        <Fielder label='Phone: ' {...bindInput('phone')} />
        <Fielder label='OVERRIDDEN_BY_BIND' {...bindInput('first')} />
        <Fielder label='Last: ' name='last'   inputs={inputs} onChange={doChange}/>
        <Fielder label='Password: ' {...bindInput('pw')} type='password'/>
        <input type="submit" value="Submit" />
      </form>
      <br />
      {/* ------------------------------------------ */}
      {/* <AutoForm fields={initVals} inputs={inputs} onChange={doChange}/> */}
      <AutoForm fields={initVals} bindInput={bindInput}/>
      <br />
      <div>Submitted data:</div>
      <pre style={{margin:0, fontSize:10}}>
        {submittedTxt && submittedTxt.split(',').join(',\n')}
      </pre>
      <br /><br />
    </div>
  )
}
