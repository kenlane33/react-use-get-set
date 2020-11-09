import React from "react"
import { ensureArr } from '../helpers/iterators'
//-------------------------------------o
export const DefLabeledValue = ({label, name, inputs, onChange, ...rest}) => (
  <div style={{display:'inline'}}>
    <label>
      {label}
      <input type="text" value={inputs && inputs[name]} name={name} onChange={onChange}/>
    </label><br />
  </div>
)
//-------------------------------------o
export const AutoForm = ({ formBind, inputBinds, fields, SubmitBtn }) => {
  //console.log(inputBinds)
  return (
    <form {...formBind}>
      {ensureArr(fields, Object.keys(inputBinds)).map( k => {
        console.log(k)
        return <DefLabeledValue key={k} label={k+': '} {...inputBinds[k]} />;
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}
const DefIndentSpacer = () => <div style={{display:'inline', marginLeft:50}}></div>
//-------------------------------------o
export const AutoFormTree = (props) => {
  const { formBind, inputBinds, fields, SubmitBtn, 
    IndentSpacer=DefIndentSpacer,
    LabeledValue=DefLabeledValue,
  } = props
  let parents = [], depth, nextDepth
  const deltaDepth = () => (depth - nextDepth)
  const inParents = (k) => parents.contains(k)
  return (
    <form {...formBind}>
      {ensureArr(fields, Object.keys(inputBinds)).map( k => {
        console.log(k)
        return (<div key={k}>
          <IndentSpacer />
          <LabeledValue key={k} label={k+': '} {...inputBinds[k]} />
        </div>)
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}