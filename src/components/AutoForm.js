import React from "react"
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
export const AutoForm = ({fields, bindForm, inputBinds}) => (
  <form {...bindForm}>
    {Object.keys(fields).map( k => (
      <Fielder key={k} label={k+': '} {...inputBinds[k]} />
    ))}
    <input type="submit" value="Submit" />
  </form>
)