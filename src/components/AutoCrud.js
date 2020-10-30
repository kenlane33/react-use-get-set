import React from "react"
import { ensureArr } from '../helpers/iterators'
import AutoForm from './AutoForm'
import AutoShowHash from './AutoShowHash'
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
export const AutoCrud = ({ verb, hash, fields = Object.keys(hash)}) => {
  switch (verb){
    case 'edit': return (
      <AutoForm {...hash}>
        {ensureArr(fields, Object.keys(hash)).map( k => (
          <Fielder key={k} label={k+': '} {...hash[k]} />
          ))}
          <input type="submit" value="Submit" />
      </AutoForm>
      );
      case 'show': return 
      default: return
    }
  }