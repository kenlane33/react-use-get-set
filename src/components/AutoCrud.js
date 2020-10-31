import React, { useState, useEffect } from "react"
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


const doResponseCheck = (res, url, callbackFn )=>{ 
  if (res.ok) callbackFn(res)
  else throw new Error(`ERROR: url:${url} status:${res.statusText} `)
}
const fetchify = ( url, hash, callbackFn, fetchFn, options={} ) => (
  fetchFn( url, { body: hash&&JSON.stringify(hash), ...options } )
  .then( (res)=>{ 
    doResponseCheck(res, url, callbackFn )
  } )
  .catch( (err)=>{throw(err)} )
)
const fakeFetch = (secs, bodyAsHash=null) => (url,options)=>new Promise(
  resolve => setTimeout(resolve, secs*1000, 
    {
      ok:true,
      body:JSON.stringify(bodyAsHash),
      json:()=>bodyAsHash // returns hash
    }
  )
);

const fetchGet = (url, callbackFn, fetchFn=fetch, options={}) => (
  fetchify(url, undefined, callbackFn, fetchFn, {...options, method:'GET'} )
)
const fetchPut = ( url, hash, callbackFn, fetchFn=fetch, options={} ) => (
  fetchify(url, hash, callbackFn, fetchFn, {...options, method:'PUT'} )
)

const fetchDelete = ( url, callbackFn, fetchFn=fetch, options={} ) => (
  fetchify(url, undefined, callbackFn, fetchFn, {...options, method:'DELETE'} )
)

const verbBind = (verb, table, func) => ({ 
  href: `/${table}/${verb}`,
  onClick: (ev)=>{ ev.preventDefault()
    log(`CLICK [[[${verb}]]]`)
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
  const [verb, doSetVerb] = useState(props.verb||'loading')
  const [gettedHash, setGettedHash] = useState({vals:{}})
  useEffect(()=>{
    fetchGet(`/${props.table}/${props.id}`, (res)=>{
      setGettedHash( res.json() )
      setVerb('show')
    }, fakeFetch(2, props.hash)) // }, fetch )
  },[ props.hash, props.id, props.table ]) // Dependencies
  const setVerb = (x)=>{ doSetVerb(x); log(`setVerb(${x})`) }
  const {doSubmitted} = props
  return <AutoCrudDraw {...{...props, hash:gettedHash, verb, setVerb, doSubmitted}} />
}

const AutoFormEdit = (props) => {
  const { table, id, verb, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const ezForm = useEzForm(
    hash,
    (newHash)=>{
      log('Edit.Submitted',newHash)
      doSubmitted(newHash)
      setVerb('show...')
      fetchPut( `/${table}/${id}`, newHash, (res)=>setVerb('show'), fakeFetch(2,null) )
      log(`From:${verb} do fetchPut( /${table}/${id}, hash, (res)=>setVerb('show') )`)
    }
  )
  // const {inputs, doChange, doSubmit, inputBinds, formBind} = ezForm
  const SubmitComp = (p) => <a {...p} style={{padding: 8, lineHeight: 2}} href="#">Save</a>
  return (
    <AutoForm {...{...ezForm, SubmitComp, fields}}/>
  )
}

const parseLoadingFromVerb = (verb) => (
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
  log('AutoCrudDraw', props)
  const { table, id, verb, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const [loading, theVerb] = parseLoadingFromVerb(verb)
  const setVerbLater = (verb, secs=2) => { setTimeout(()=>setVerb(verb), secs*1000) }
  
  if (theVerb==='loading') { return ( // <<<<<<<<<<<<<<<<<<<<<< LOADING
    <div><LoadingThang/></div>
  )} else
  if (theVerb==='edit') { return ( // <<<<<<<<<<<<<<<<<<<<<< EDIT
    <>
      <AutoFormEdit {...{...props, doSubmitted, id}} />
      <CrudLink verb="cancel"   table={table} func={()=>{setVerb('show') }}/>
    </> 
  )} else
  if (theVerb==='show') { return ( // <<<<<<<<<<<<<<<<<<<<<< SHOW
      <div>
        <AutoShowHash {...{hash, fields}} />
        {loading ? <LoadingThang/> : 
          <>
            <CrudLink verb="edit"   table={table} func={()=>{ setVerb('edit') }}/>
            <CrudLink verb="delete" table={table} func={()=>{ 
              setVerb('deleting')
              setVerbLater('deleted')
              fetchDelete(`/${table}/${id}`,(res)=>{
                if (res.ok) setVerb('deleted') 
                else setVerb('deletedERR')
              }, fakeFetch(2,null))
            }}/>
          </>
        }
      </div>
  )} else
  if (theVerb==='deleting') { return ( // <<<<<<<<<<<<<<<<<<<<<< DELETING
    <div>
      {/*fields.map((x,i)=><br key={i}/>)/* Some spacers of similar size */}
      <LoadingThang/>
      <div><b>Deleting</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>
  )}
  if (theVerb==='deleted') { return (  // <<<<<<<<<<<<<<<<<<<<<< DELETED
    <div>
      {fields.map((x,i)=><br key={i}/>)/* Some spacers of similar size */}
      <div><b>Deleted</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>
  )}
  else { return (
    <div>{verb}</div>
  )}
}