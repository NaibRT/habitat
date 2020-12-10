import React, { forwardRef } from 'react'


const TTAutocompleteListItem=forwardRef(({x,val,click,refProp,reff})=>
 (
  <div ref={reff} onClick={(e)=>click(refProp,e)} data-id={x.id} data-name={`${x.author},${x.title},${x.year}`}>
     <strong>{x.author.substring(0, val.length)}</strong>
     {x.author.substring(val.length)},
     {x.title},
     {x.year}
     <input type='hidden' value={x}/>
  </div>
 ))


export default TTAutocompleteListItem
