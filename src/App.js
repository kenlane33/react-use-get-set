import React from "react"
import { DemoUseGetSetStateWithCode } from './demos/DemoUseGetSetStateWithCode'
import { DemoUseGetSetState } from './demos/DemoUseGetSetState'
import { DemoUseToggleState } from './demos/DemoUseToggleState'
import { DemoUseResetState } from './demos/DemoUseResetState'
import { DemoUseCheckboxState } from './demos/DemoUseCheckboxState'
import "./styles.css"

//======================////===============O
export default function App() { return (
  <div className="App">
    <DemoUseGetSetStateWithCode />    
    <DemoUseGetSetState />
    <DemoUseToggleState />
    <DemoUseResetState />
    <DemoUseCheckboxState />
  </div>
)}
