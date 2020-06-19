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
const AutoForm = ({fields, inputs, onChange, onSubmit}) => (
  <form onSubmit={onSubmit}>
    {Object.keys(fields).map( k => (
      <Fielder key={k} label={k+': '} name={k} inputs={inputs} onChange={onChange} />
    ))}
    <input type="submit" value="Submit" />
  </form>
)
//===========//////////////========================o
export const DemoUseEzForm = () => {
  const initVals = {
    phone:'999-123-4567',
    first:'Gee',
    last:'Willikars',
    password: '12345'
  }
  let [submittedTxt, setSubmitted] = useState('_')
  //-------------------------------------o
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
          <input {...bindInput('password')} type="password" />
        </label><br />


        <input type="submit" value="Submit" />

      </form>      
      <br />
      {/* ------------------------------------------ */}
      <form onSubmit={doSubmit}>
        <Fielder label='Phone: ' {...bindInput('phone')}/>
        <Fielder label='First: ' name='first' inputs={inputs} onChange={doChange}/>
        <Fielder label='Last: ' name='last'   inputs={inputs} onChange={doChange}/>
        <Fielder label='Password: ' {...bindInput('password')} type='password'/>
        <input type="submit" value="Submit" />
      </form>
      <br />
      {/* ------------------------------------------ */}
      {/* <AutoForm fields={initVals} inputs={inputs} onChange={doChange}/> */}
      <AutoForm fields={initVals} {...bindInput()}/>
      <br />
      <div>Submitted data:</div>
      <pre style={{margin:0, fontSize:10}}>
        {submittedTxt.split(',').join(',\n')}
      </pre>
      <br /><br />
    </div>
  )
}
