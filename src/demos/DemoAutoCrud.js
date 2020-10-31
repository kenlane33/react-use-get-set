import React, { useState } from "react"
// import { useEzForm } from "../hooks/useEzForm"
import { DemoHeader } from './DemoHeader'
import { AutoCrud } from '../components/AutoCrud'
import { PrismCode } from "../components/PrismCode"

//===========//////////////========================o
export const DemoAutoCrud = () => {
  let [submittedTxt, setSubmitted] = useState('_')
  // let [seePw, setSeePw] = useState(true)
  //-------------------------------------o
  const hash0 = {
    phone: '999-123-4567', // just an initial value
    first:['Gee', {style:{color:'blue'}, label:'First name==>'}], // [0] is intial value, [1] is obj to spread onto the ezForm.inputBinds.first
    last:'Willikars',      // just an initial value
    pw: ['12345', {type:'password'}] // [0] is intial value, [1] is obj to spread onto the ezForm.inputBinds.pw
  }
  const [hash, setHash] = useState(hash0)

  const FormHeader = ({txt}) => (
    <div style={{padding:10, backgroundColor:'#eee', marginBottom:10}}>
      {txt}
    </div>
  )
  const leftStl = {textAlign:'left'}
  const Code = (p) => <pre style={{display:'inline', fontWeight:700, fontSize:17}}>{p.children}</pre>

  const doSubmitted = (hash) => {
    setSubmitted( JSON.stringify(hash))
    setHash(hash)
  }

  // const initValsCode = `const initVals = ${JSON.stringify(initVals)}`
  //-------------------------------------o
  return (
    <div>
      <DemoHeader demoTxt='DemoAutoCrud' useTxt='useEzForm()' />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Data used in examples below:" />
        <div style={{marginLeft:40}}>

          <div style={{backgroundColor:'#011627', padding: 20, width: 490, margin:'10 auto' }}>  
            <PrismCode language='js' code={`
const hash = {
  phone: '999-123-4567',
  first:['Gee', {style:{color:'blue'}, label:'First name==>'}],
  last:'Willikars',
  pw: ['12345', {type:'password'}] 
}`.trim()} >
            </PrismCode>
            </div>
          <div style={leftStl}>
            Behold the AutoCrud!!!:<br />
            <Code>{`<AutoCrud hash={hash} />`}</Code>
          </div>
        </div>
      </div>
      <br />  
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="Fully automatic AutoCrud" />
        <AutoCrud {...{table:'user', hash, doSubmitted}} />
      </div>
      <br />  
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="AutoCrud plus specific, ordered fields only"/>
        <AutoCrud {...{table:'user', hash, doSubmitted, fields:['last','first']}}  />
      </div>
      <br />
      {/* ------------------------------------------ */}
      <div style={{border:'1px solid grey'}}>
        <FormHeader txt="AutoForm: Manual props" />
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
