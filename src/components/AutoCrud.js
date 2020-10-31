import React, { useState } from "react"
// import { ensureArr } from '../helpers/iterators'
import {AutoForm} from './AutoForm'
import AutoShowHash from './AutoShowHash'
import { useEzForm } from "../hooks/useEzForm"
const {log} = console;

//-------------------------------------o
export const Fielder = ({label, name, inputs, onChange, ...rest}) => (
  <div>
    <label>
      {label}
      <input type="text" value={inputs[name]} name={name} onChange={onChange} {...rest}/>
    </label><br />
  </div>
)
const fetchPut = ( url, hash, func, options={} ) => (
  fetchify(url, hash, func, {...options, method:'PUT'} )
)

const doResponseCheck = (res, url, func )=>{ 
  if (res.ok) func(res)
  else throw new Error(`ERROR: url:${url} status:${res.statusText} `)
}
const fetchify = ( url, hash, func, options={} ) => (
  fetch( url, { body: JSON.stringify(hash), ...options } )
  .then( (res)=>{ 
    doResponseCheck(res, url, func )
  } )
  .catch( (err)=>{throw(err)} )
)

const verbBind = (verb, table, func) => ({ 
  href: `/${table}/${verb}`,
  onClick: (ev)=>{ ev.preventDefault()
    func(table,verb,ev)
  },
})
const titleCase = ([firstLetter, ...rest]) => (firstLetter.toUpperCase() + rest.join(''))

const CrudLink = ({verb, table, func}) => (
  <a 
    style={{padding: 8, lineHeight: 2}} 
    {...verbBind(verb, table, func)} 
  >
      {titleCase(verb)}
  </a>
)

export const AutoCrud = (props) => {
  const [verb, doSetVerb] = useState(props.verb||'show')
  const setVerb = (x)=>{ doSetVerb(x); log(`setVerb(${x})`) }
  const {doSubmitted} = props
  return <AutoCrudDraw {...{...props, verb, setVerb, doSubmitted}} />
}

const AutoFormEdit = (props) => {
  const { table, id, verb, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const ezForm = useEzForm(
    hash,
    (x)=>{
      console.log(x)
      doSubmitted(x)
      setVerb('show...')
      setTimeout( (res)=>setVerb('show'), 2000 )
      //fetchPut( `/${table}/${id}`, hash, (res)=>setVerb('show') )
    }
  )
  const {inputs, doChange, doSubmit, inputBinds, formBind} = ezForm
  return (
    <AutoForm {...ezForm} />
  )
}

const loadingFromVerb = (verb) => (
  [ /\.\.\./.test(verb), verb.replace('...','')]
)

const LoadingThang = ()=>(
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
)

//-------------------------------------o
export const AutoCrudDraw = (props) => {
  console.log('AutoCrudDraw', props)
  const { table, id, verb, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const [loading, theVerb] = loadingFromVerb(verb)

  if (theVerb=='edit') {
    return <AutoFormEdit {...{...props, doSubmitted}} />
  } else
  if (theVerb==='show') { return (
      <div>
        <AutoShowHash hash={hash} />
        {loading ? <LoadingThang/> : 
          <>
            <CrudLink verb="edit"   table={table} func={()=>{console.log('Clicked EDIT!');   setVerb('edit') }}/>
            <CrudLink verb="delete" table={table} func={()=>{console.log('Clicked Delete!'); setVerb('deleted') }}/>
          </>
        }
      </div>
  )} else
  if (theVerb==='deleted') { return (
    <div>
      {fields.map((x,i)=><br key={i}/>)}
      <div><b>Deleted</b></div>
      <CrudLink verb="undo"   table={table} func={()=>{console.log('Clicked UNDO!');   setVerb('show') }}/>
    </div>
  )}
}