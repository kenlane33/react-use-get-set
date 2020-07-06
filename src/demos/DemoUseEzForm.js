import React, { useState } from "react"
import { useEzForm } from "../hooks/useEzForm"
import { DemoHeader } from './DemoHeader'
import { AutoForm, Fielder } from '../components/AutoForm'
import { PrismCode } from "../components/PrismCode"

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
  // console.log( ezForm )

  const FormHeader = ({txt}) => (
    <div style={{padding:10, backgroundColor:'#eee', marginBottom:10}}>
      {txt}
    </div>
  )
  const leftStl = {textAlign:'left'}
  const Code = (p) => <pre style={{display:'inline', fontWeight:700, fontSize:17}}>{p.children}</pre>
  //-------------------------------------o
  return (
    <div>
      <DemoHeader demoTxt='DemoUseEzForm' useTxt='useEzForm()' />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Data used in examples below:" />
        <div style={{marginLeft:40}}>

          <div style={{backgroundColor:'#011627', padding: 20, width: 600 }}>  
            <PrismCode language='js' code={`
const initVals = {
  phone: '999-123-4567',
  first:['Gee', {style:{color:'blue'}, label:'First name==>'}],
  last:'Willikars',
  pw: ['12345', {type:'password'}] 
}`.trim()} >
            </PrismCode>
            </div>
          <p style={leftStl}>
            In this hash:<br />
            * The keys <Code>phone</Code> and <Code>last</Code> just set a simple intial value for the EzForm.<br />
            * However, the keys <Code>first</Code> and <Code>pw</Code> use an <b>array</b> to let you add extra goodies!<br />
            <br />
            When you use an array:<br />
            * [0] is an <b>intial value</b> for the key, <br />
            * [1] is a <b>hash to spread</b> onto an input tag later (using a "bind" pattern)<br />
            <br />
            Spreading a bind hash looks like this:  <br />
            <Code>{`<input {...ezForm.inputBinds.first} />`}</Code>
          </p>
        </div>
      </div>
      <br />  
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Fully automatic AutoForm" />
        <AutoForm {...ezForm} />
      </div>
      <br />  
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Manual form and demo of <input/> tags done (1) manually and (2) with {...inputBinds.*}"/>

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
      </div>
      <br />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Fielder: Manual form and {...inputBinds.*} for <input/>"/>
        <form onSubmit={doSubmit}>
          <Fielder label='Phone: ' {...inputBinds.phone} />
          <Fielder label='THIS_LABEL_TXT_OVERRIDDEN_BY_INPUT_BINDS' {...inputBinds.first} />
          <Fielder label='Last: ' name='last'   inputs={inputs} onChange={doChange}/>
          <Fielder label='Password: ' {...inputBinds.pw} type='password'/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <br />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="AutoForm: Manual props" />
        <AutoForm fields={initVals} inputBinds={inputBinds} bindForm={bindForm}/>
      </div>
      <br />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Filter and control the order of the inputs of an AutoForm" />
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <AutoForm fields={['last','first']} {...ezForm} />
          </div>
          <div style={{flex:1}}>
            <AutoForm fields={['first','last']} {...ezForm} />
          </div>
          <br />
        </div>
        </div>
      <br />
      {/* ------------------------------------------ */}
      <div>Submitted data:</div>
      <pre style={{margin:0, fontSize:10}}>
        {submittedTxt && submittedTxt.split(',').join(',\n')}
      </pre>
      <br /><br />
    </div>
  )
}
