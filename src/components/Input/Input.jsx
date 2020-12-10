import React, { Children } from 'react'
import {FormGroup,Label} from "reactstrap";
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import './Input.scss'

function Input({
        name,
        labelName,
        type,
        Ref,
        onKeyDown,
        style,
        errors,
        required,
        placeholder,
        onChange,
        min,
        max,
        existMessage,
        className,
        Children,
        tooltipTitle,
        ...rest
}) {
 return (
  <FormGroup className={`w-100 ${className}`}>
  <Label 
        style={{'position':'relative'}} 
        className={required?'lbl-star':null} 
        for='first_name'
        data-toggle="tooltip"
        title={tooltipTitle}
        >{labelName}</Label>
  <input  name={name} 
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}  
          className={`form-control`} 
          ref={Ref}
          min={min}
          max={max} 
          style={errors&&{'borderColor':'red'}}
          style={style}
          {...rest}
          />
          {Children}
  <ErrorLabel text={errors&&errors.message}/>
  <ErrorLabel text={existMessage}/>
 </FormGroup>
 )
}

export default Input
