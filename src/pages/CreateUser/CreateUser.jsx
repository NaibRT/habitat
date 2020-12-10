import React, { useState, useEffect } from 'react'
//import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './create-user.scss'
import { Container,Row, Col, Card, CardBody,Form,FormGroup,Label,Button } from "reactstrap";
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
// import {RegisterUser} from '../../store/user/action'
// import {apiError} from '../../store/auth/login/actions'
// import { connect } from 'react-redux';
// import { withRouter} from 'react-router-dom';
import axios from 'axios'
import SelectBox from '../../components/SelectBox/SelectBox';
import TextArea from '../../components/TextArea/TextArea'
import swal from 'sweetalert2'
import { Get, Post } from '../../services/fetchService';

const CreateUser=(props)=>{

   const [img,setImg]=useState({
     url:'',
     file:[]
   });
   const {register,handleSubmit,errors} = useForm()
   const [selectedMulti3,setSelectedMulti3] = useState([])
   const [about ,setAbout] = useState('')
   const [categories,setCategroies]=useState([{
         options:[]
   }])
   const [groups ,setGroups] = useState([])
   const animatedComponents = makeAnimated();
   const [user,setUser] = useState({});



   useEffect(()=>{
      let token=JSON.parse(localStorage.getItem('authUser'));

      Get(`${process.env.REACT_APP_API_URL}/roles`,{
        headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
        }
      }).then(res=>{
        setGroups(res.data)
      })

      Get(`${process.env.REACT_APP_API_URL}/categories`,{
        headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
        }
      }).then(res=>{
         let data=[];
         res.data.forEach(x=>
         data.push({id:x.id,label:x.name,value:x.name})
       );

       setCategroies([{
        options:data
       }])
      })

   },[])

   const handleMulti3 = selectedMulti3 => {
     console.log(selectedMulti3)
		setSelectedMulti3([ ...selectedMulti3 ]);
  };
  
   const aboutHandler = (e)=>{
       setAbout(e.target.value)
   }


  const fileOnchange = (e)=>{
    console.log(e.target.files[0])
    setImg({
      url:URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0]
    })
  }

  const submit = (data) => {
    //let newUser={...data};
    console.log(data)
    let newUser=new FormData();
    selectedMulti3.forEach((x,i)=>{
        newUser.append('categories[]',x.id)
    })
    newUser.append('note',about)
    //newUser.append('categories',cats)
    newUser.append('avatar',img.file)
    newUser.append('role_id',data.groups)
    newUser.append('name',data.first_name)
    newUser.append('surname',data.last_name)
    //newUser.append('username',data.username)
    newUser.append('email',data.email)
    newUser.append('password',data.password)

    let token=JSON.parse(localStorage.getItem('authUser'))
    Post(`${process.env.REACT_APP_API_URL}/users`,newUser,{
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':token&&`${token.token_type}${token.access_token}`
      }
    }).then(async res=>{
       if(res.data.status===2003){
        swal.fire({
          title:'Əməliyyat uğurla yerinə yetirildi',
          text:res.data.message
        })
        console.log(res.data)
       }
    })
    //props.RegisterUser(newUser)
  }

 return (
  <div className="page-content">
  <Container fluid={true}>
<Card>
<CardBody style={{'padding':'45px 80px'}}>
<Form onSubmit={handleSubmit(submit)} enctype='multipart/form-data'>
<Row>
<Col lg={12} style={{'display':'flex','justifyContent':'center'}}>
<FormGroup style={{'border':'0px solid transparent','marginBottom':'2rem'}}>
<div className='user-img'>
{
  img.url!==''?
  <img src={img.url} alt=''/>
  :  <img src={require('../../assets/images/icons/avatar.png')} alt=''/>
}
</div>
<Button className='w-85 mt-3' color='primary'>
<input onChange={fileOnchange} type="file" name="file" className='form-control'/>
Şəkil əlavə et
</Button>
</FormGroup>
</Col>
</Row>
<Row>
  <Col lg={6}>
    <FormGroup>
     <Label className='lbl-star' for='first_name'>Ad</Label>
     <input  name='first_name' type="text" className='form-control' ref={register({
      required:{value:true,message:'ad boş ola bilməz!'}
    })} style={errors.first_name&&{'borderColor':'red'}}/>
     <ErrorLabel text={errors.first_name&&errors.first_name.message}/>
    </FormGroup>
  </Col>
  <Col lg={6}>
    <FormGroup>
      <Label className='lbl-star' for='last_name'>Soyad</Label>
      <input name='last_name' type="text" className='form-control' ref={register({
        required:{value:true,message:'soyad boş ola bilməz!'}
      })} style={errors.last_name&&{'borderColor':'red'}}/>
      <ErrorLabel text={errors.last_name&&errors.last_name.message}/>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col lg={6}>
    <FormGroup>
     <Label className='lbl-star' for='email'>E-poçt</Label>
     <input name='email' className='form-control' ref={register({
      required:{value:true,message:'email boş ola bilməz!'}
    })} style={errors.email&&{'borderColor':'red'}}/>
    <ErrorLabel text={errors.email&&errors.email.message}/>
    </FormGroup>
  </Col>
  <Col lg={6}>
    <FormGroup>
      <Label className='lbl-star' for='password'>Şifrə</Label>
      <input name='password' type="password" className='form-control' ref={register({
        required:{value:true,message:'şifrə boş ola bilməz!'}
      })} style={errors.password&&{'borderColor':'red'}}/>
      <ErrorLabel text={errors.password&&errors.password.message}/>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col lg={6}>
{/*    <FormGroup>
     <Label className='lbl-star' for='groups'>Tip</Label>
     <select name='groups' className="form-control" ref={register({
      required:{value:true,message:'tip boş ola bilməz!'}
    })} style={errors.groups&&{'borderColor':'red'}}>
     <option></option>
     {
       groups.map((x,i)=>{
          return <option key={i} value={x.id}>{x.name}</option>
       })
     }
 </select>
 <ErrorLabel text={errors.groups&&errors.groups.message}/>
    </FormGroup>*/}
    <SelectBox name='groups' 
               LabelName='Tip'
               option={groups}
               required={true}
               register={register({
                required:{value:true,message:'tip boş ola bilməz!'}
              })}
              errors={errors.groups} 
              />
  </Col>
  <Col lg={6}>
{/*    <FormGroup>
      <Label for='categories'>Kateqoriya</Label>
      <select name='categories' className="form-control" ref={register({
        required:{value:true,message:'kateqoriya boş ola bilməz!'}
      })} style={errors.category&&{'borderColor':'red'}}>
      <option></option>
      <option>Large select</option>
      <option>Small select</option>
  </select>
  <ErrorLabel text={errors.category&&errors.category.message}/>
    </FormGroup>*/}
    <FormGroup className="mb-0 templating-select select2-container">
    <Label className='lbl-star' for='categories'>Kateqoriya</Label>
    <Select
      value={selectedMulti3}
      isMulti={true}
      onChange={handleMulti3}
      options={categories}
      classNamePrefix="select2-selection"
      closeMenuOnSelect={false}
      components={animatedComponents}
    />
    {/*<ErrorLabel text={errors.categories&&errors.categories.message}/>*/}
  </FormGroup>
  </Col>
</Row>
<Row>
<Col lg={12}>
{/*<FormGroup>
<Label>Detallar</Label>
 <textarea 
           className='user-txtarea'
          onChange={aboutHandler}
           name='about'
           >
 </textarea>
</FormGroup>*/}
<TextArea name='about' labelName='Qeyd' onChange={aboutHandler}/>
</Col>
</Row>
 <Button className='mt-1 btn w-25' color='primary' type='submit'>Yarat</Button>
</Form>
</CardBody>
</Card>
</Container>
</div>
 )
}

// const mapStatetoProps = state => {
//   const { error } = state.Login;
//   return { error };
// }

export default CreateUser;

