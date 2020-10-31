import React from "react"
// import { ensureArr } from '../helpers/iterators'
import { unpackHashArrs } from '../helpers/iterators.js'
const {log} = console

const titleCase = ([firstLetter, ...rest]) => (firstLetter.toUpperCase() + rest.join(''))

//-------------------------------------o
export const SimpleLabelValueComp = ({label, value}) => (
  <div>
    <label>
      {titleCase(label)}{': '}
      <span><b>{value}</b></span>
    </label><br />
  </div>
)
//-------------------------------------o
export const AutoShowHash = ({ hash, fields=Object.keys(hash), KeyValueComp=SimpleLabelValueComp }) => {
  const [hash2] = unpackHashArrs(hash)
  return (
    <div>
      {fields.map( k => {
        log(`<AutoShowHash hash['${k}']=${hash2[k]}`)
        return <KeyValueComp key={k} label={k} value={hash2[k]} />
      })}
    </div>
  )
}

export default AutoShowHash