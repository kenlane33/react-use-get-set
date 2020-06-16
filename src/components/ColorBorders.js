import React from "react";

const ColorBorder = (p) => (
  <div style={{border:'solid 2px ' + p.stl[0], padding:p.stl[1], margin:p.stl[2]}} >
    {p.children}
  </div>
)

//===========/////////////===========================================o
export const ColorBorders = ({colors, first=true, children}) => {
  const [x, ...rest] = colors
  const len = rest.length
  console.log(colors, len)
  const next = (len>0) 
    ? <ColorBorders colors={rest} first={false} children={children}/> 
    : children
  const stl = (first) ? [x,2,20] : ( len===0 ? [x,20,2] : [x,2,2] )
  return (
    <ColorBorder stl={stl} first={false}>
      {next}
    </ColorBorder>
  ) 
} // Usage ----------------------------
// <ColorBorders colors={['red','orange','yellow']}>
//   Some text inside the borders
// </ColorBorders>