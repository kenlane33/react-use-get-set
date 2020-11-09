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
        return <DefLabeledValue key={k} label={k+': '} {...inputBinds[k]} />;
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}
//====###############==================================O
const DefIndentSpacer = () => <div style={{display:'inline', marginLeft:20}}></div>
const DefIndentedParent = ({label}) => <div style={{display:'inline'}}>{label}</div>

//===========############==============================O
export const AutoFormTree = (props) => {

  const { formBind, inputBinds,
    SubmitBtn, 
    fields=Object.keys(inputBinds), 
    IndentSpacer=DefIndentSpacer,
    LabeledValue=DefLabeledValue,
    IndentedParent=DefIndentedParent
  } = props

  let drawnParents = []
  
  const someIndentSpacers = (n) => (n > 0) && Array(n).fill().map((x, i) => <IndentSpacer key={i} />)

  return (
    <form {...formBind}>
      {fields.map( k => {
        const keyParts = k.split('.')
        const lastK = keyParts[keyParts.length - 1]
        const parents = keyParts.slice(0,-1)
        let depth = 0
        const alreadyDrawn = (x) => {
          const ret = drawnParents.includes(x)
          ret || drawnParents.push(x)
          return ret
        }

        return (
          <div key={k}>
            {parents.map((x,i)=> {
              const ret = ( alreadyDrawn(x) ||   // if already drawn, skip drawing it ( thanks to || )
                <div key={x}>
                  {someIndentSpacers(depth)}
                  <IndentedParent label={titleCase(x)} />
                </div>
              )
              depth++
              return ret
            })}
            {someIndentSpacers(parents.length)}
            <LabeledValue key={k} label={titleCase(lastK)+': '} {...inputBinds[k]} />
          </div>
        )
      })}
      {SubmitBtn ? <SubmitBtn onClick={formBind.onSubmit}/> : <input type="submit" value="Submit" />}
    </form>
  );
}