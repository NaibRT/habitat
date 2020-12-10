import React, { useState, useEffect } from 'react'
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle,Container, Form,FormGroup,Label,Button } from "reactstrap";
import './datatable.scss'
import axios from 'axios';
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import Alert from 'sweetalert2'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Breadcrumbs from '../../components/Common/Breadcrumb';

function CategoriesUpdate(props) {
const [data,setData]=useState({
  name:''
})
const {register,handleSubmit,errors} = useForm()

 useEffect(()=>{
  let token = JSON.parse(localStorage.getItem('authUser'));
  let id = props.match.params.id;
   axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        })
            .then(res => {
           setData(res.data.data)
            })
            .catch(err=>console.log(err))
    
},[])


    const onSubmit = data => {
        let token=JSON.parse(localStorage.getItem('authUser'));
        let id = props.match.params.id;
        axios.post(`${process.env.REACT_APP_API_URL}/categories/${id}?_method=PUT`,JSON.stringify(data),{
            headers:{
                'Content-Type':'application/json',
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        })
            .then(res => {
               console.log("gonderdimm",res)
                Alert.fire({
                    title: 'Əlavə olundu!',
                    text: 'Məlumat uğurla əlavə edildi.',
                    icon: 'success',
                    confirmButtonText: 'Təsdiqlə'
                })

            })
            .catch(err=>console.log(err))
    }


 return (
  <React.Fragment>
  <div className="page-content">
    <div className="container-fluid">
      <Breadcrumbs title="Kateqoriya" breadcrumbItem="Kateqoriya düzəliş et" />
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
                    {
                       
                         <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                   
                        <Row>
                        <Col lg={12}>
                        <FormGroup>
                                            <Label className='lbl-star' for='last_name'>Kateqoriya</Label>
                                            <input name='name' 
                                                   type="text" 
                                                   value={`${data?.name}`}
                                                   onChange={e=>setData({
                                                     ...data,
                                                     [e.target.name]:e.target.value
                                                   })}  
                                                   className='form-control' 
                                                   ref={register({
                                                required:{value:true,message:'Tarix boş ola bilməz!'}
                                            })} style={errors.name&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.name?.message}/>
                                        </FormGroup>
                           
                           </Col>
                           </Row>
                                           <Row>
                                     <Col lg={12}>
                                         <Button className='mt-1 btn ' color='primary' type='submit'>Əlavə et</Button>
                                     </Col>
                                 </Row>
                 </Form>    
              
                    }
           
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</React.Fragment>
 )
}

export default CategoriesUpdate
