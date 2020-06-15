import React from "react"
//====/////:///==========================O
const ResetBtn = p => (
  <button onClick={p.st.reset[p._var]}>
    Reset {p._var} to {'"' + p.st.initVals[p._var] + '"'}
  </button>
) // Usage: ------------------------------
// var st = useStateHash({fun:42})
// return (<div>
//   <span>Fun: {st.fun}</span>
//   <Resetter _var='fun' st={st}/>
// </div>)
// See:         Fun: 42 [ Reset fun to "42"]
//------------

export default ResetBtn