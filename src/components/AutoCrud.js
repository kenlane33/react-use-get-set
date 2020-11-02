import React, { useState, useEffect } from "react"
// import { ensureArr } from '../helpers/iterators'
import {AutoForm} from './AutoForm'
import AutoShowHash from './AutoShowHash'
import { useEzForm } from "../hooks/useEzForm"
import { fetchGet, fakeFetch, fetchPut, fetchDelete } from "../helpers/fetchify";
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

const verbBind = (verb, table, func) => ({ 
  href: `/${table}/${verb}`,
  onClick: (ev)=>{ ev.preventDefault()
    log(`CLICK [[[${verb}]]]`)
    func(table,verb,ev)
  },
})
const titleCase = ([firstLetter, ...rest]) => (firstLetter.toUpperCase() + rest.join(''))
const singular = (word) => word.replace(/[s|es]\b/,'')

const clearedHash = (hash) => {
  let newHash = {}
  Object.keys(hash).forEach( (x)=> newHash[x] = '' )
  return newHash
}

const CrudLink = ({verb, table, func}) => (
  <a 
    style={{padding: 8, lineHeight: 2}} 
    {...verbBind(verb, table, func)} 
  >
      {titleCase(verb)}
  </a>
)
export const crudUrlGen = (rootUrl, table, id) => {
  const base   = `${rootUrl}${table}`
  const baseId = `${base}/${id||''}`
  return {
    index:   base,
    new:     `${base}/new`,
    create:  base, 
    show:   baseId,
    edit:   `${baseId}/edit`,
    update: baseId,
    destroy:baseId,
  }
}

export const AutoCrud = (props) => {

  const {rootUrl='/', table, hash, id, doSubmitted} = props
  const [verb, doSetVerb] = useState(props.verb||'loading')
  const [gettedHash, setGettedHash] = useState({vals:{}})
  const crudUrlFor = crudUrlGen(rootUrl, table, id)
  const setVerb = (x)=>{ log(`setVerb(${x})`); doSetVerb(x);  }

  useEffect(()=>{ // <<<<<<<<<<<<< Once! 

    fetchGet( crudUrlFor.show, (hash, res)=>{
      setGettedHash( hash )
      setVerb('show')
    }, {}, fakeFetch(2, hash)) // }, fetch )

  },[ hash, id, crudUrlFor.show ]) // <<<<< Dependencies

  return <AutoCrudDraw {...{...props, hash:gettedHash, verb, setVerb, doSubmitted}} />
}
//----############-------------------
const AutoFormEdit = (props) => {
  const { rootUrl, table, id, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const crudUrlFor = crudUrlGen(rootUrl, table, id)
  const uponSubmit = (newHash, resp) => {
    log('useEzForm.SubmitCallbackFn() ', newHash)
    doSubmitted(newHash)
    setVerb('update')
    fetchPut(crudUrlFor.update, newHash, (hash, res) => setVerb('show'), {}, fakeFetch(2, null))
  }
  const ezForm = useEzForm( hash, uponSubmit )
  const SubmitLink = (p) => <a {...p} style={{padding: 8, lineHeight: 2}} href="/">Save</a>
  return (
    <AutoForm {...{...ezForm, SubmitLink}}/>
  )
}

const LoadingThang = ()=>(
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
)
const FakeItems = ({setVerb, table}) => [1,2,3,4].map( (x)=> (
  <div key={x}>
    {singular(titleCase(table))} #{x}
    <CrudLink verb="show" table={table} id={x} func={()=>{setVerb('show') }}/>
    <CrudLink verb="edit" table={table} id={x} func={()=>{setVerb('edit') }}/>
  </div>
))
//-------------------------------------o
export const AutoCrudDraw = (props) => {
  log('AutoCrudDraw()', props)
  const { rootUrl, table, id, verb, hash, setVerb, doSubmitted, fields=Object.keys(hash) } = props
  const crudUrlFor = crudUrlGen(rootUrl, table, id)

  const comps = {
    Loading: (p)=><div>
      <LoadingThang/>
    </div>,

    Index:   (p)=><div>
      <div>Index</div>
      <FakeItems {...{setVerb, table}}/>
      <br/>
      <CrudLink verb="add" table={p.table} func={()=>{setVerb('new') }}/>
    </div>,

    New:     (p)=><div>
      Add
      <AutoFormEdit {...{...p, hash:clearedHash(hash)}} />
      <CrudLink verb="cancel" table={p.table} func={()=>{setVerb('index') }}/>
    </div>,

    Create:     (p)=><div>
      Create
      <AutoShowHash {...{hash, fields}} />
      <LoadingThang />
      <CrudLink verb="cancel" table={p.table} func={()=>{setVerb('index') }}/>
    </div>,

    Edit:    (p)=>{
      return(<>
        <AutoFormEdit {...{...props, doSubmitted, id}} />
        <CrudLink verb="cancel" table={p.table} func={()=>{setVerb('show') }}/>
      </>)
    },
    Update:  ({hash, fields})=><div>
      <AutoShowHash {...{hash, fields}} />
      <LoadingThang/>
    </div>,
    Show:    ({table, hash, fields})=><div>
      <AutoShowHash {...{hash, fields}} />
      <CrudLink verb="edit"   table={table} func={()=>{ setVerb('edit') }}/>
      <CrudLink verb="destroy" table={table} func={()=>{
        setVerb('destroying')
        fetchDelete( crudUrlFor.destroy, /* and then */ (hash, res)=>{
          log('fetchDelete() ',res)
          if (res.ok) setVerb('destroyed') 
          else       {setVerb('destroyedERR'); log('fetchDelete().res ',res) }
        }, {}, fakeFetch(2,null))
      }}/>
      <CrudLink verb="index"   table={table} func={()=>{ setVerb('index') }}/>
    </div>,
    Destroying: ({table}) => <div>
      <LoadingThang/>
      <div><b>Deleting</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>,

    Destroyed: ({table,fields,hash}) => <div>
      <div><b>Deleted</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>,

    DestroyedERR: ({table,fields,hash}) => <div>
      <div><b>Error Deleting</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>,
  }
  log(`<CompToRender/> = <${titleCase(verb)}/> | ${verb}`)
  const CompToRender = comps[titleCase(verb)]
  return <CompToRender {...props}/>

  if (verb==='loading') { return ( // <<<<<<<<<<<<<<<<<<<<<< LOADING
    <div><LoadingThang/></div>
  )} else
  if (verb==='edit') { return ( // <<<<<<<<<<<<<<<<<<<<<< EDIT
    <>
      <AutoFormEdit {...{...props, doSubmitted, id}} />
      <CrudLink verb="cancel"   table={table} func={()=>{setVerb('show') }}/>
    </> 
  )} else
  if (verb==='show' || verb==='update') { return ( // <<<<<<<<<<<<<<<<<<<<<< SHOW
      <div>
        <AutoShowHash {...{hash, fields}} />
        {(verb==='update') ? <LoadingThang/> : 
          <>
            <CrudLink verb="edit"   table={table} func={()=>{ setVerb('edit') }}/>
            <CrudLink verb="destroy" table={table} func={()=>{ 
              setVerb('destroying')
              //setVerbLater('destroyed')
              fetchDelete( crudUrlFor.destroy, /* and then */ (res)=>{
                if (res.ok) setVerb('destroyed') 
                else setVerb('destroyedERR')
              }, {}, fakeFetch(2,null))
            }}/>
          </>
        }
      </div>
  )} else
  if (verb==='destroying') { return ( // <<<<<<<<<<<<<<<<<<<<<< DELETING
    <div>
      {/*fields.map((x,i)=><br key={i}/>)/* Some spacers of similar size */}
      <LoadingThang/>
      <div><b>Deleting</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>
  )}
  if (verb==='destroyed') { return (  // <<<<<<<<<<<<<<<<<<<<<< DELETED
    <div>
      {fields.map((x,i)=><br key={i}/>)/* Some spacers of similar size */}
      <div><b>Deleted</b></div>
      <CrudLink verb="undo" table={table} func={()=>{setVerb('show') }}/>
    </div>
  )}
  else { return (
    <div>Ummmm... {verb}</div>
  )}
}