import React from "react"
// import { ensureArr } from '../helpers/iterators'
import { unpackHashArrs } from '../helpers/iterators.js'
const {log} = console

//-------------------------------------o
export const LabeledValue = ({label, value}) => (
  <div>
    <label>
      {label}
      <span>{value}</span>
    </label><br />
  </div>
)
//-------------------------------------o
export const AutoShowHash = ({ hash, fields=Object.keys(hash) }) => {
  const [hash2] = unpackHashArrs(hash)
  return (
    <div>
      {fields.map( k => {
        log(`<AutoShowHash hash['${k}']=${hash2[k]}`)
        return <LabeledValue key={k} label={k+': '} value={hash2[k]} />
      })}
    </div>
  )
}

export default AutoShowHash