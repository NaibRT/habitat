import React from 'react'
import {FormGroup,Label } from "reactstrap";
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';

function SelectBox({onChange,value,name,register,className,LabelName,required,option,errors}) {
  console.log(option)
 return (
  <FormGroup className='w-100'>
  <Label className={required?'lbl-star':null} for={name}>{LabelName}</Label>
  <select onChange={onChange} 
          value={value&&value} 
          name={name} 
          className={`form-control ${className}`} 
          ref={register} 
          style={errors&&{'borderColor':'red'}}>
  <option></option>
  {
    option&&
    option.map((x,i)=>{
       return <option key={i} value={x.id}>{x.name}</option>
    })
  }
</select>
<ErrorLabel text={errors&&errors.message}/>
 </FormGroup>
 )
}

export default SelectBox
