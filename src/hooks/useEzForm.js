import {useState} from "react"

export const useEzForm = ( initialValues={}, submitCallback=( ()=>{}) ) => {
  const [inputs, setInputs] = useState( initialValues || {} );
  //------------------------------o
  const doSubmit = (ev) => {
    ev && ev.preventDefault()
    submitCallback && submitCallback( inputs )
  }
  //------------------------------o
  const doChange = (ev) => {
    ev.persist()
    setInputs(inputs => ({...inputs, [ev.target.name]: ev.target.value}))
  }
  //------------------------------o
  const bindInput = (nm) => ({
    inputs: inputs,
    onChange: doChange,
    type: 'text',
    name: nm,
    value:    (nm===undefined) ? undefined : inputs[nm],
    onSubmit: (nm===undefined) ? doSubmit : undefined,
  })
  //------------------------------o
  return { inputs, doChange, doSubmit, bindInput}
  
}// Usage --------------------
// const {doSubmit, bindInput} = useEzForm(
//   { first:'Gee', last:'Willikars'},
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
//     <input type="submit" value="Submit" />
//   </form>      
// )
