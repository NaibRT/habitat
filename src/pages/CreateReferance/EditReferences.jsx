
import React, { useState, useEffect } from 'react'
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container,Row, Col, Card, CardBody,Form,FormGroup,Label,Button } from "reactstrap";
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';

import axios from 'axios'
import SelectBox from '../../components/SelectBox/SelectBox';
import TextArea from '../../components/TextArea/TextArea'
import './CreateReferance.scss'
import Breadcrumbs from '../../components/Common/Breadcrumb';

const EditReferance=(props)=>{

    const {register,handleSubmit,errors} = useForm();
    const [] = useState({
        data:{},
        status:false
    })

    const onSubmit = data => {

        let token = JSON.parse(localStorage.getItem('authUser'));
        let id = props.params.match.id;
        axios.post(`${process.env.REACT_APP_API_URL}/reference_create/`,JSON.stringify(data),{
            headers:{
                'Content-Type':'application/json',
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err=>console.log(err))
    }

    
    return (
        <div className="page-content">
            <Container fluid={true}>
            <Breadcrumbs title="İstinadlar" breadcrumbItem="Düzəliş et"/>
                <Card>
                    <CardBody style={{'padding':'45px 80px'}}>
                        <Form onSubmit={handleSubmit(onSubmit)} enctype='multipart/form-data'>

                            <Row>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label className='lbl-star' for='first_name'>Yazarın adı</Label>
                                        <input  name='writer_name' type="text" className='form-control' ref={register({
                                            required:{value:true,message:'ad boş ola bilməz!'}
                                        })} style={errors.first_name&&{'borderColor':'red'}}/>
                                        <ErrorLabel text={errors.first_name&&errors.first_name.message}/>
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label className='lbl-star' for='last_name'>Nəşr ili</Label>
                                        <input name='publication_date' type="date"  className='form-control' ref={register({
                                            required:{value:true,message:'soyad boş ola bilməz!'}
                                        })} style={errors.last_name&&{'borderColor':'red'}}/>
                                        <ErrorLabel text={errors.last_name&&errors.last_name.message}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label className='lbl-star' for='email'>Kitabın adı</Label>
                                        <input name='book_name' className='form-control' ref={register({
                                            required:{value:true,message:'email boş ola bilməz!'}
                                        })} style={errors.email&&{'borderColor':'red'}}/>
                                        <ErrorLabel text={errors.email&&errors.email.message}/>
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label className='lbl-star' for='password'>Kitabın linki</Label>
                                        <input name='book_link' type="text" className='form-control' ref={register({
                                            required:{value:true,message:'şifrə boş ola bilməz!'}
                                        })} style={errors.password&&{'borderColor':'red'}}/>
                                        <ErrorLabel text={errors.password&&errors.password.message}/>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Col lg={8}>

    <Button className='mt-1 btn w-25 ml-2' color='primary'  type='submit'>Düzəliş et</Button>
                            </Col>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}


export default EditReferance;





