import React from "react"

export const DemoHeader2 = ({demoTxt, useTxt}) => (
  <div>
    <div style={{position:'relative', top:-25}}>
      <pre style={{position:'absolute', textAlignment: 'left', left:10, fontSize:10 }}>
        &lt;{demoTxt} /&gt;
      </pre>
    </div>
    {/*---////--------------------------------------*/}
    <h4 style={{fontFamily:'monospace'}}>{useTxt}</h4>
  </div>
) // Usage ----------------
// <DemoHeader demoTxt='stuff' useTxt='nonsense' />
export const DemoHeader = ({demoTxt, useTxt}) => (
  <div style={{borderTop: 'solid 6px black'}}>
    <div style={{
      textAlign: 'left',
      fontFamily: 'monospace',
      color: '#fff',
      backgroundColor: '#000',
      padding: 16,
      borderTop: 'solid 1px yellow',
      marginBottom: 10
      }}>
      <span style={{textAlign:'left',fontSize:10, paddingRight: 40 }}>
        &lt;{demoTxt} /&gt;
      </span>
      <span style={{textAlign:'left'}}>{useTxt}</span>
      {/*---////--------------------------------------*/}
    </div>
  </div>
) // Usage ----------------
// <DemoHeader demoTxt='stuff' useTxt='nonsense' />
