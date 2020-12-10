import React from 'react'
import {FormGroup,Label } from "reactstrap";
import './TextArea.scss'

function TextArea({name,onChange,labelName,value,Ref}) {
 return (
  <FormGroup>
  <Label>{labelName}</Label>
   <textarea 
             value={value}
             className='txtarea'
            onChange={onChange}
             name={name}
             ref={Ref}
             >
   </textarea>
  </FormGroup>
 )
}

export default TextArea
