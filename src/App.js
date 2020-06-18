import React from "react"
import { DemoUseGetSetStateWithCode } from './demos/DemoUseGetSetStateWithCode'
import { DemoUseGetSetState } from './demos/DemoUseGetSetState'
import { DemoUseToggleState } from './demos/DemoUseToggleState'
import { DemoUseResetState } from './demos/DemoUseResetState'
import { DemoUseCheckboxState } from './demos/DemoUseCheckboxState'
//import { forEachInHash } from "./helpers/iterators.js"
import "./styles.css"
const {log} = console


function recursiveMap(children, toMerge, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, toMerge, fn),
        ...toMerge
      });
    }
    return fn(child);
  });
}

const UseForm = (p) => {
  // p.hash = {}
  // const els = recursiveMap( p.children, 
  //   { boo: 'foo'}, 
  //   (c) => {
  //     if (c.type==='input') {
  //       log( c )
  //     }
  //     return c
  //   }
  // )
  // log( els )
  return ( <div>
    {p.children}
  </div> )
}
const useForm = () => {
  const initVals = {}
  const doSubmit = ()=>(4)
  const bind = (el) => {
    if (el){
      log(el)
      initVals[el.name] = el.value
      el.value += '777'
      //el.setAttribute('onChange',()=>(log('beep')))
      el.addEventListener('onClick', ()=>(log('click:'+el.name)), false)
      el.addEventListener('onChange', ()=>(log('chg:'+el.name)), false)
      log(initVals)
    }
  }
  return {bind, doSubmit, initVals}
}
//======================////===============O
export default function App() { 
  const formSt = useForm()
  return (
  <div className="App">
    {/* <UseForm>
      <form onSubmit={() => 4}>
        <label>
          First:
          <input type="text" value="999-123-4567" name="phoneNumber" ref={formSt.bind} />
        </label>
        <label>
          First:
          <input type="text" value="Gee" name="first" ref={formSt.bind} />
        </label>
        <label>
          Last:
          <input type="text" value="Wilikars" name="last" ref={formSt.bind} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </UseForm>
  */}
    <DemoUseGetSetStateWithCode />    
    <DemoUseGetSetState />
    <DemoUseToggleState />
    <DemoUseResetState />
    <DemoUseCheckboxState /> 
  </div>
)}
