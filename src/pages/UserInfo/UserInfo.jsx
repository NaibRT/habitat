import React, { useState, useEffect } from 'react'
//import { Editor } from "react-draft-wysiwyg";
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../CreateUser/create-user.scss'
import './userInfo.scss'
import { Container,Row, Col, Card, CardBody,Form,FormGroup,Label,Button, Breadcrumb } from "reactstrap";
import {useForm} from 'react-hook-form'
import ErrorLabel from '../../components/Error/ErrorLabel/ErrorLabel';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
// import {RegisterUser} from '../../store/user/action'
// import {apiError} from '../../store/auth/login/actions'
// import { connect } from 'react-redux';
// import { withRouter} from 'react-router-dom';
import axios from 'axios'
import TextArea from '../../components/TextArea/TextArea';
import Swal from 'sweetalert2';

const UserInfo=(props) => {
  const animatedComponents = makeAnimated();
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
   const [user,setUser] = useState({
    note: "",
    categories: [],
    email: "",
    name: "",
    surname:"",
    roles:[],
    id: '',
    avatar: "",
   });



   useEffect(()=>{
            let token=JSON.parse(localStorage.getItem('authUser'))
            let id = props.match.params.id;

             axios.get(`${process.env.REACT_APP_API_URL}/roles`,{
                headers:{
                  'Authorization':token&&`${token.token_type}${token.access_token}`
                }
            }).then(res=>{
                setGroups(res.data.data)
            }).catch(err=>console.log(err))

      axios.get(`${process.env.REACT_APP_API_URL}/categories`,{
        headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
        }
      }).then(res=>{
         let data=[];
       res.data.data.forEach(x=>
         data.push({id:x.id,label:x.name,value:x.name})
       );
       setCategroies([{
        options:data
       }])
      })
      .catch(err=>console.log(err))
      axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`,{
       headers:{
        'Authorization':token&&`${token.token_type}${token.access_token}`
       }
   }).then(res=>{
       setImg({
         ...img,
         url:res.data.data.avatar
       })
       setUser({
         ...user,
         ...res.data.data,
         name:res.data.data.full_name.split(' ')[0],
         surname:res.data.data.full_name.split(' ')[1]
       })
   })
   .catch(err=>console.log(err))
   },[])

   useEffect(()=>{
    let cats=[];
    categories[0].options.forEach(x=>{
      if(user.categories.find(y=>y.id===x.id)){
        console.log(x)
        cats.push(x)
      }
    })
 console.log(cats)
 setSelectedMulti3(cats)
   },[categories,user])



   const handleMulti3 = selectedMulti3 => {
     console.log(selectedMulti3)
		setSelectedMulti3(selectedMulti3&&[ ...selectedMulti3 ]);
  };
  
   const aboutHandler = (e)=>{
       setAbout(e.target.value)
   }


  let fileOnchange = (e)=>{
    console.log(e.target.files[0])
    setImg({
      url:URL.createObjectURL(e.target.files[0]),
      file:e.target.files[0]
    })
  }

  const inputOnchange = (e)=>{
       if(e.target.name==='groups'){
        setUser({
         ...user,
         [e.target.name]:[e.target.value]
        })
       }
       else if(e.target.name==='categories'){
        setUser({
         ...user,
         [e.target.name]:[e.target.value]
        })
       }else{
        setUser({
         ...user,
         [e.target.name]:e.target.value
        })
       }
  }



  let submit = (data) => {
    let newUser=new FormData();
    selectedMulti3.forEach((x,i)=>{
        newUser.append('categories[]',x.id)
    })

    newUser.append('note',data.note)
    if(img.file.length>0)
       newUser.append('avatar',img.file)

    newUser.append('role_id',data.roles)
    newUser.append('name',data.name)
    newUser.append('surname',data.surname)

    if(data.email)
       newUser.append('email',data.email)

     console.log(newUser)
     console.log(data)
    let token=JSON.parse(localStorage.getItem('authUser'))
    axios.post(`${process.env.REACT_APP_API_URL}/users/${user.id}?_method=PUT`,newUser,{
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':token&&`${token.token_type}${token.access_token}`
      },
    }).then(async res=>{
      console.log(res.data)
      Swal.fire({
        title:'Success',
        text:res.data.message
      })
    }).catch(err=>{
      Swal.fire({
        title:'Error',
        text:err.response.data.message
      })
    })
    //props.RegisterUser(newUser)
  }
  
 return (
  <div className="page-content">
  <Container fluid={true}>
  {/*<Breadcrumb title='Dashboard' breadcrumbItem='UserInfo' />*/}
<Card>
<CardBody style={{'padding':'45px 80px'}}>
<Form onSubmit={handleSubmit(submit)} enctype='multipart/form-data' autoComplete='new-password'>
<Row>
<Col lg={12} style={{'display':'flex','justifyContent':'center'}}>
<FormGroup style={{'border':'0px solid transparent','marginBottom':'2rem'}}>
<div className='user-img'>
{
  img.url!==''?
  <img src={img.url} alt=''/>
  :  <img src={'http://138.197.202.223/media/person.png'} alt=''/>
}
</div>
<Button className='w-85 mt-3' color='primary'>
<input onChange={fileOnchange} type="file" name="avatar" className='form-control' ref={register()}/>
Şəkil əlavə et
</Button>
</FormGroup>
</Col>
</Row>
<Row>
  <Col lg={6}>
    <FormGroup>
     <Label className='lbl-star' for='first_name'>Ad</Label>
     <input value={user.name} onChange={inputOnchange}  name='name' type="text" className='form-control' ref={register()} style={errors.first_name&&{'borderColor':'red'}}/>
     <ErrorLabel text={errors.first_name&&errors.first_name.message}/>
    </FormGroup>
  </Col>
  <Col lg={6}>
    <FormGroup>
      <Label className='lbl-star' for='last_name'>Soyad</Label>
      <input onChange={inputOnchange} value={user.surname} name='surname' type="text" className='form-control' ref={register()} style={errors.last_name&&{'borderColor':'red'}}/>
      <ErrorLabel text={errors.last_name&&errors.last_name.message}/>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col lg={6}>
    <FormGroup>
     <Label className='lbl-star' for='email'>E-poçt</Label>
     <input onChange={inputOnchange} name='email' onFocus={(event) => {
      event.target.autocomplete='';
    }} placeholder={user.email} className='form-control' autoComplete={false} ref={register()} style={errors.email&&{'borderColor':'red'}}/>
    <ErrorLabel text={errors.email&&errors.email.message}/>
    </FormGroup>
  </Col>
  <Col lg={6}>
    <FormGroup>
      <Label className='lbl-star' for='password'>Şifrə</Label>
      <input onChange={inputOnchange} name='password' type="password" className='form-control' ref={register()} style={errors.password&&{'borderColor':'red'}}/>
      <ErrorLabel text={errors.password&&errors.password.message}/>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col lg={6}>
    <FormGroup>
     <Label className='lbl-star' for='groups'>Tip</Label>
     <select onChange={inputOnchange} value={user.roles[0]&&user.roles[0].id} name='roles' className="form-control" ref={register()} style={errors.groups&&{'borderColor':'red'}}>
     <option></option>
     {
       groups.map((x,i)=>{
          return <option key={i} value={x.id}>{x.name}</option>
       })
     }
 </select>
 <ErrorLabel text={errors.groups&&errors.groups.message}/>
    </FormGroup>
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
      isMulti={true}
      onChange={handleMulti3}
      options={categories}
      value={selectedMulti3}
      classNamePrefix="select2-selection"
      closeMenuOnSelect={false}
      components={animatedComponents}
    />
  </FormGroup>
  </Col>
</Row>
<Row>
<Col lg={12}>
{/*<FormGroup>
<Label>Detallar</Label>
 <textarea 
          className='user-txtarea'
           value={user.about}
          onChange={inputOnchange}
           name='about'
           >
 </textarea>
</FormGroup>*/}
<TextArea
  value={user.note}
  name='note'
  labelName='Qeyd'
  onChange={inputOnchange}
  Ref={register()}
/>
</Col>
</Row>
 <Button className='mt-1 btn w-25' color='primary' type='submit'>Düzəliş et</Button>
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

export default UserInfo;

