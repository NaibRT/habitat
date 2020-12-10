
import React, { useState, useEffect } from 'react'
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container,Row, Col, Card, CardBody,Form,FormGroup,Label,Button } from "reactstrap";
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import Alert from 'sweetalert2'
import axios from 'axios'
import './CreateReferance.scss'
import { Post } from '../../services/fetchService';
import Breadcrumbs from '../../components/Common/Breadcrumb';


const CreateReferance=(props)=>{

    const {register,handleSubmit,errors} = useForm()
    const onSubmit = data => {
        let token=JSON.parse(localStorage.getItem('authUser'));
        Post(`${process.env.REACT_APP_API_URL}/references/`,JSON.stringify(data),{
            headers:{
                'Content-Type':'application/json',
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        }).then(res => {
            props.toggleModal&&props.toggleModal()

            Alert.fire({
                title: 'Əlavə olundu!',
                text: 'Məlumat uğurla əlavə edildi.',
                icon: 'success',
                confirmButtonText: 'Təsdiqlə'
            })
            document.getElementById('referenceForm').reset()
        })

        // axios.post(`${process.env.REACT_APP_API_URL}/references/`,JSON.stringify(data),{
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Authorization':token&&`${token.token_type}${token.access_token}`
        //     }
        // })
        //     .then(res => {
        //         props.toggleModal()
        //         Alert.fire({
        //             title: 'Əlavə olundu!',
        //             text: 'Məlumat uğurla əlavə edildi.',
        //             icon: 'success',
        //             confirmButtonText: 'Təsdiqlə'
        //         })

        //     })
        //     .catch(err=>console.log(err))
    }
    return (
        <div className="page-content">
            <Container fluid={true}>
            <Breadcrumbs title="İstinadlar" breadcrumbItem="Yeni İstinad"/>
                <Card>
                    <CardBody>
                        <Form id='referenceForm' onSubmit={handleSubmit(onSubmit)} enctype='multipart/form-data'>


                                <Row>
                                    <Col lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='author'>Yazarın adı</Label>
                                            <input  name='author' type="text" className='form-control' ref={register({
                                                    required:{value:true,message:'Ad boş ola bilməz!'}
                                            })} style={errors.writer_name&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.writer_name&&errors.writer_name.message}/>
                                        </FormGroup>
                                    </Col>
                                    <Col  lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='year'>Nəşr ili</Label>
                                            <input name='year' type="text"  className='form-control' ref={register({
                                                required:{value:true,message:'Tarix boş ola bilməz!'}
                                            })} style={errors.publication_date&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.publication_date&&errors.publication_date.message}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col  lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='title'>Kitabın adı</Label>
                                            <input name='title' className='form-control' ref={register({
                                                required:{value:true,message:'Kitabın adı boş ola bilməz!'}
                                            })} style={errors.book_name&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.book_name&&errors.book_name.message}/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} sm={12} >
                                        <FormGroup>
                                            <Label for='url'>Kitabın linki</Label>
                                            <input name='url' type="text" className='form-control' ref={register()} style={errors.book_link&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.book_link&&errors.book_link.message}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                 <Row>
                                     <Col lg={12}>
                                         <Button className='mt-1 btn ' color='primary' type='submit'>Əlavə et</Button>
                                     </Col>
                                 </Row>




                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}


export default CreateReferance;





