import React from "react";
import { DemoUseGetSetStateWithCode } from "./demos/DemoUseGetSetStateWithCode";
import { DemoUseGetSetState } from "./demos/DemoUseGetSetState";
import { DemoUseToggleState } from "./demos/DemoUseToggleState";
import { DemoUseResetState } from "./demos/DemoUseResetState";
import { DemoUseCheckboxState } from "./demos/DemoUseCheckboxState";
import { DemoUseEzForm } from "./demos/DemoUseEzForm";
// import { DemoFetchGetPut } from "./demos/DemoFetchGetPut";
import { DemoAutoCrud } from "./demos/DemoAutoCrud";

//import { forEachInHash } from "./helpers/iterators.js"
import "./styles.css";
//const {log} = console

//======================////===============O
export default function App() {
  //-------------------------------------o
  return (
    <div className="App">
      <DemoAutoCrud />
      {/* <DemoFetchGetPut /> */}
      <DemoUseEzForm />
      <DemoUseGetSetStateWithCode />
      <DemoUseGetSetState />
      <DemoUseToggleState />
      <DemoUseResetState />
      <DemoUseCheckboxState />
    </div>
  );
}
