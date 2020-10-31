import { useGetSetState } from "./useGetSetState.js"
import { unpackHashArrs, forEachInHash } from '../helpers/iterators.js'

export const useEzForm = ( initialValues={}, submitCallback=( ()=>{}), formProps={} ) => {
  //const [inputs, setInputs] = useState( initialValues || {} )
  const [initVals, hashOfInputProps] = unpackHashArrs(initialValues)
  const inputs = useGetSetState( initVals || {} )
  const vals = inputs.vals
  //------------------------------o
  const doSubmit = (ev) => {
    ev && ev.preventDefault()
    submitCallback && submitCallback( inputs.vals )
  }
  //------------------------------o
  const doChange = (ev) => {
    ev.persist()
    // setInputs(inputs => ({...inputs, [ev.target.name]: ev.target.value}))
    inputs[ev.target.name] = ev.target.value
  }
  //------------------------------o
  const makeInputBindForKey = (nm) => (Object.assign({
    inputs: inputs, // send in the whole Hashy structure, too
    onChange: doChange,
    type: 'text',
    name: nm,
    value:    inputs[nm],
  }, (hashOfInputProps||{})[nm]||{} )) // merge props if present in initVals arrays

  let inputBinds = {}
  forEachInHash( inputs.vals, ([k,v])=>{ inputBinds[k] = makeInputBindForKey(k) })
  //------------------------------o
  const formBind = (Object.assign({
    onSubmit: doSubmit 
  }, formProps||{} )) // merge props if present 
  //------------------------------o
  return { inputs, doChange, doSubmit, inputBinds, formBind, vals }
  
}// Usage --------------------
// const {doSubmit, bindInput, formBind} = useEzForm(
//   { 
//     first:'Gee', 
//     last:['Willikars', {style:{color:'blue'} }]
//     pw:  ['', {type:'password'}]
//    },
//   (x)=>console.log(x)
// )
// return (
//   <form onSubmit={doSubmit}>
//     <label> 
//       First name: <input {...bindInput('first')} />
//     </label>
//     <label> 
//       Last name: <input {...bindInput('last')} />
//     </label>
//     <label> 
//       Password: <input {...bindInput('pw')} />
//     </label>
//     <input type="submit" value="Submit" />
//   </form>      
// )
