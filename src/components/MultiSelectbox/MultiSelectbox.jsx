import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function MultiSelectbox({labelName,name,value,onChange,options,required}) {
 const animatedComponents = makeAnimated();
 return (
  <FormGroup className="mb-0 templating-select select2-container">
  <Label className={required&&'lbl-star'} for='categories'>{labelName}</Label>
  <Select
    name={name}
    value={value}
    isMulti={true}
    onChange={onChange}
    options={options}
    classNamePrefix="select2-selection"
    closeMenuOnSelect={false}
    components={animatedComponents}
  />
  {/*<ErrorLabel text={errors.categories&&errors.categories.message}/>*/}
</FormGroup>
 )
}

export default MultiSelectbox
