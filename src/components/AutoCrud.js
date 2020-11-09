import React, { useState, useEffect } from "react"
// import { ensureArr } from '../helpers/iterators'
import {AutoForm, AutoFormTree} from './AutoForm'
import AutoShowHash from './AutoShowHash'
import { useEzForm } from "../hooks/useEzForm"
import { fetchGet, fakeFetch, fetchPut, fetchDelete } from "../helpers/fetchify"
import { flattenObj } from '../helpers/iterators'
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
//const singular = (word) => word.replace(/[s|es]\b/,'')

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

//===========########========================================
export const AutoCrud = (props) => {
  const verb0 = props.verb || 'index'
  const {rootUrl='/', table, id, doSubmitted} = props
  const [verb, doSetVerb] = useState('loading'+titleCase(verb0))
  const [gettedHash, setGettedHash] = useState({vals:{}})
  const crudUrlFor = crudUrlGen(rootUrl, table, id)
  const setVerb = (x)=>{ log(`setVerb(${x})`); doSetVerb(x);  }
  
  useEffect(()=>{ // <<<<<<<<<<<<< Once! 
    const getUrl = crudUrlFor[ (verb0==='index'||verb0==='show') ? verb0 : 'show' ]
    fetchGet( getUrl, (hash, res)=>{
      setGettedHash( hash )
      setVerb(verb0)
    })
    
  },[verb0]) // <<<<< Dependencies
  
  const nextProps = { ...props, hash: gettedHash, verb, setVerb, doSubmitted, setGettedHash };
  return (
    <AutoCrudDraw {...nextProps} />
  )
}

//====############============================================
const AutoFormEdit = (props) => {
  const { rootUrl, table, id, hash, setVerb, doSubmitted } = props
  const flatHash = flattenObj(hash)
  const fields = props.fields || Object.keys(flatHash)
  
  const crudUrlFor = crudUrlGen(rootUrl, table, id)

  const afterSubmitFn = (newHash, resp) => {
    log('useEzForm.SubmitCallbackFn() ', newHash)
    doSubmitted(newHash)
    setVerb('update')
    const afterFetchPutFn = (hash, res) => {setVerb('show')}
    fetchPut(crudUrlFor.update, newHash, afterFetchPutFn, {}, fakeFetch(2, null))
  }
  const ezForm = useEzForm( flatHash, afterSubmitFn )

  const SubmitBtn = (p) => <a {...p} style={{padding: 8, lineHeight: 2}} href="/">Save</a>
  return (
    <AutoFormTree {...{...ezForm, SubmitBtn, fields}}/>
  )
}

const LoadingThang = ()=>(
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
)

//-------------------------------------o
export const AutoCrudDraw = (props) => {
  log('AutoCrudDraw()', props)
  const { rootUrl, table, id, verb, hash, setVerb, 
          doSubmitted, fields=Object.keys(hash), setGettedHash 
  } = props
  const crudUrlFor = crudUrlGen(rootUrl, table, id)

  const comps = {
    LoadingShow: (p)=><div><LoadingThang/></div>,
    LoadingIndex: (p)=><div><LoadingThang/></div>,
    LoadingEdit: (p)=><div><LoadingThang/></div>,

    Index:   (p)=><div>
      {(typeof hash==='object') ? 
        <AutoShowHash {...{hash, fields}} />
      :
      hash.map((h,i)=> (
        h && <div key={i}>
          <AutoShowHash {...{h, fields:[]}} />
        </div> 
      ))}
      <br/>
      <CrudLink verb="add" table={p.table} func={()=>{setVerb('new') }}/>
    </div>,

    New:     (p)=><div>
      <AutoFormEdit {...{...p, hash:clearedHash(hash)}} />
      <CrudLink verb="cancel" table={p.table} func={()=>{setVerb('index') }}/>
    </div>,

    Create:     (p)=><div>
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
      <CrudLink verb="index"   table={table} func={()=>{
        fetchGet( crudUrlFor.index, (gettedHash, res)=>{
          //setGettedHash( hash )
          log('Index.res=',res, 'gettedHash=', gettedHash)
          setGettedHash( gettedHash )
          setVerb('index')
        }, {}, fetch)
        setVerb('loadingIndex')
      }}/>
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
  return (CompToRender) ? 
    <div>
      <div style={{background:'#ddd', padding:10}}>
        {titleCase(verb)}
      </div>
      <div style={{padding:'5px 20px'}}>
        <CompToRender {...props}/> 
      </div>
    </div>
  : <div>
    Cannot find {`<CompToRender/> for verb=${verb}`} {JSON.stringify(props)}
  </div>
}