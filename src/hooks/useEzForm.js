import {useState} from "react"

export const useEzForm = ( initialValues={}, submitCallback=( ()=>{}) ) => {
  const [inputs, setInputs] = useState( initialValues || {} );
  const doSubmit = (ev) => {
    ev && ev.preventDefault()
    submitCallback && submitCallback( inputs )
  }
  const doChange = (ev) => {
    ev.persist()
    setInputs(inputs => ({...inputs, [ev.target.name]: ev.target.value}))
  }
  return { inputs, doChange, doSubmit, }
}
