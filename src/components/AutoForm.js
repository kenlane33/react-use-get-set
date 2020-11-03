import React from "react"
import { ensureArr } from '../helpers/iterators'
//-------------------------------------o
export const Fielder = ({label, name, inputs, onChange, ...rest}) => (
  <div>
    <label>
      {label}
      <input type="text" value={inputs[name]} name={name} onChange={onChange}/>
    </label><br />
  </div>
)
//-------------------------------------o
export const AutoForm = ({ formBind, inputBinds, fields, SubmitBtn }) => {
  //console.log(inputBinds)
  return (
    <form {...formBind}>
      {ensureArr(fields, Object.keys(inputBinds)).map( k => (
        <Fielder key={k} label={k+': '} {...inputBinds[k]} />
      ))}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  )
}