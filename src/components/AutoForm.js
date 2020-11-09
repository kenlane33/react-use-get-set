import React from "react"
import { ensureArr } from '../helpers/iterators'
import { titleCase } from '../helpers/string_helpers'

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
        //console.log(k)
        return <DefLabeledValue key={k} label={k+': '} {...inputBinds[k]} />;
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}
//====###############==================================O
const DefIndentSpacer = () => <div style={{display:'inline', marginLeft:20}}></div>

//===========############==============================O
export const AutoFormTree = (props) => {

  const { formBind, inputBinds, fields, SubmitBtn, 
    IndentSpacer=DefIndentSpacer,
    LabeledValue=DefLabeledValue,
  } = props

  let drawnParents = []
  
  return (
    <form {...formBind}>
      {ensureArr(fields, Object.keys(inputBinds)).map( k => {
        const keyParts = k.split('.')
        const lastK = keyParts[keyParts.length - 1]
        //const deltaDepth = depth - lastDepth
        const parents = keyParts.slice(0,-1)
        let depth = 0
        const inParents = (x) => {const ret = drawnParents.includes(x); ret || drawnParents.push(x); return ret}

        //console.log('k=',k,' depth=', depth, ' keyParts=', keyParts, ' parents=', parents, ' drawnParents=', drawnParents)
        return (<div key={k}>
          {parents.map((x,i)=> {
            const ret = (inParents(x) ||  
            <div key={x}>
              {(depth > 0) && Array(depth).fill().map((x, i) => <IndentSpacer key={i} />)}
              {titleCase(x)}
            </div>)
            depth++;
            return ret
          })}
          {parents.map((x,i)=><IndentSpacer key={i}/>)}
          <LabeledValue key={k} label={titleCase(lastK)+': '} {...inputBinds[k]} />
        </div>)
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}