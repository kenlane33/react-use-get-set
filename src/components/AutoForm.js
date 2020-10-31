import React from "react"
import { ensureArr } from '../helpers/iterators'
//-------------------------------------o
export const Fielder = ({label, name, inputs, onChange, ...rest}) => (
  <div>
    <label>
      {label}
      <input type="text" value={inputs[name]} name={name} onChange={onChange} {...rest}/>
    </label><br />
  </div>
)
//-------------------------------------o
export const AutoForm = ({ formBind, inputBinds, fields, SubmitComp }) => (
  <form {...formBind}>
    {ensureArr(fields, Object.keys(inputBinds)).map( k => (
      <Fielder key={k} label={k+': '} {...inputBinds[k]} />
    ))}
    {SubmitComp ? <SubmitComp onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
  </form>
)