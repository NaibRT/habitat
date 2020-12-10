import React, {useRef } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container,Row, Col, Card, CardBody,Form,Modal,FormGroup,Label,Button, CardTitle } from "reactstrap";
import Input from '../../components/Input/Input'
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import axios from 'axios';
import Alert from 'sweetalert2'
import { Post } from '../../services/fetchService';
import Breadcrumbs from '../../components/Common/Breadcrumb';



const Categories=()=>{

    const {register,handleSubmit,errors} = useForm();
    let categoryFormRef=useRef('');

    const onSubmit = data => {
        let token=JSON.parse(localStorage.getItem('authUser'));
        Post(`${process.env.REACT_APP_API_URL}/categories/`,JSON.stringify(data),{
            headers:{
                'Content-Type':'application/json',
                'Authorization':token&&`${token.token_type}${token.access_token}`
            }
        }).then(() => {
                Alert.fire({
                    title: 'Əlavə olundu!',
                    text: 'Məlumat uğurla əlavə edildi.',
                    icon: 'success',
                    confirmButtonText: 'Təsdiqlə'
                })
                document.getElementById('categoryForm').reset()
            })
    }
    return (
        <div className="page-content">
            <Container fluid={true}>
            <Breadcrumbs title="Kateqoriya" breadcrumbItem="Kateqoriya əlavə et" />
                <Card>
                    <CardBody>
                        <Form id='categoryForm' onSubmit={handleSubmit(onSubmit)} enctype='multipart/form-data'>
                                <Row>
                                    <Col lg={12} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='first_name'>Kateqoriya</Label>
                                            <input  name='name' type="text" className='form-control' ref={register({
                                                    required:{value:true,message:'Xana boş ola bilməz!'}
                                            })} style={errors.writer_name&&{'borderColor':'red'}}/>
                                            <ErrorLabel text={errors.writer_name&&errors.writer_name.message}/>
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



export default Categories;
