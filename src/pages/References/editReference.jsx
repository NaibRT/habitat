
import React, { useState, useEffect } from 'react'
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container,Row, Col, Card, CardBody,Form,FormGroup,Label,Button } from "reactstrap";
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import Alert from 'sweetalert2'
import axios from 'axios'
import {Get, Post} from '../../services/fetchService'
import Breadcrumbs from '../../components/Common/Breadcrumb';
//import './CreateReferance.scss'


const EditReferance=(props)=>{

  const {register,handleSubmit,errors} = useForm()
  const [state, setstate] = useState({
   title: "",
   author: "",
   year: "",
   url: "",
 })

    useEffect(()=>{
     let token=JSON.parse(localStorage.getItem('authUser'));
     let id = props.match.params.id;
    
     Get(`${process.env.REACT_APP_API_URL}/references/${id}`,{
      headers:{
       'Content-Type':'application/json',
       'Authorization':`${token.token_type} ${token.access_token}`
      }
     }).then(res=>{
       setstate(res.data.reference);
     })
     // axios.get(`${process.env.REACT_APP_API_URL}/references/${id}`,{
     //  headers:{
     //   'Content-Type':'application/json',
     //   'Authorization':`${token.token_type} ${token.access_token}`
     // }
     // }).then(res=>{

     // })
    },[])
    

    const onSubmit = data => {
        let token=JSON.parse(localStorage.getItem('authUser'));
        console.log(token.categories)
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

            Post(`${process.env.REACT_APP_API_URL}/references/`,JSON.stringify(data),{
             headers:{
                 'Content-Type':'application/json',
                 'Authorization':token&&`${token.token_type}${token.access_token}`
             }
           }).then(res => {
             console.log(res.data)
             Alert.fire({
              title: 'Əlavə olundu!',
              text: 'Məlumat uğurla əlavə edildi.',
              icon: 'success',
              confirmButtonText: 'Təsdiqlə'
             })
           })
    }
    
    const onChangeHandler = (e) => {
       setstate({
         ...state,
         [e.target.name]:e.target.value
       })
    }

    return (
        <div className="page-content">
            <Container fluid={true}>
            <Breadcrumbs title="İstinadlar" breadcrumbItem="Düzəliş et"/>
                <Card>
                    <CardBody>
                        <Form onSubmit={handleSubmit(onSubmit)} enctype='multipart/form-data'>
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='author'>Yazarın adı</Label>
                                            <input  name='author' value={state.author} type="text" className='form-control' ref={register({
                                                    required:{value:true,message:'Ad boş ola bilməz!'}
                                            })} style={errors.writer_name&&{'borderColor':'red'}}
                                             onChange={onChangeHandler}
                                            />
                                            <ErrorLabel text={errors.writer_name&&errors.writer_name.message}/>
                                        </FormGroup>
                                    </Col>
                                    <Col  lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='year'>Nəşr ili</Label>
                                            <input name='year' value={state.year} type="text"  className='form-control' ref={register({
                                                required:{value:true,message:'Tarix boş ola bilməz!'}
                                            })} style={errors.publication_date&&{'borderColor':'red'}}
                                            onChange={onChangeHandler}
                                            />
                                            <ErrorLabel text={errors.publication_date&&errors.publication_date.message}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col  lg={6} sm={12}>
                                        <FormGroup>
                                            <Label className='lbl-star' for='title'>Kitabın adı</Label>
                                            <input name='title' value={state.title} className='form-control' ref={register({
                                                required:{value:true,message:'Kitabın adı boş ola bilməz!'}
                                            })} style={errors.book_name&&{'borderColor':'red'}}
                                            onChange={onChangeHandler}
                                            />
                                            <ErrorLabel text={errors.book_name&&errors.book_name.message}/>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} sm={12} >
                                        <FormGroup>
                                            <Label  for='url'>Kitabın linki</Label>
                                            <input name='url' value={state.url} type="text" className='form-control' ref={register()} style={errors.book_link&&{'borderColor':'red'}}
                                            onChange={onChangeHandler}
                                            />
                                            <ErrorLabel text={errors.book_link&&errors.book_link.message}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                 <Row>
                                     <Col lg={12}>
                                         <Button className='mt-1 btn ml-2' color='primary'  type='submit'>Düzəliş et</Button>
                                     </Col>
                                 </Row>




                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}


export default EditReferance;





