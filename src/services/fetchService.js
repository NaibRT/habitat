import axios from 'axios'
import Swal from 'sweetalert2'

const ErrorHandle = ({status,message}) => {

    if(status===4010){

    }
    else if(status===4041){
     window.location.href='/login';
    }
    else if(status===4011){
      window.location.href='/login';
    }
    else if(status===4042){
      localStorage.removeItem('authUser');
      window.location.href='/login';
    }
    else if(status===4030){
  
    }
    else if(status===4220){
  
    }

    Swal.fire({
      title:'Error',
      icon:'error',
      text:message
     })
}

const Get = (url,header)=>{
 return new Promise((resolve,reject)=>{
     axios.get(url,header)
     .then(res=>{
       resolve(res.data)
     })
     .catch(err=>{
       console.log(err.response.data)
       ErrorHandle(err.response.data)
       //errorHandle(err.response.data)
     })
 })
}

const Post = (url,data,header)=>{
 return new Promise((resolve,reject)=>{
     axios.post(url,data,header)
     .then(res=>{
       resolve(res.data)
     })
     .catch(err=>{
      console.log(err.response.data)
      ErrorHandle(err.response.data)
     })
 })
}

const Delete = (url,header)=>{
  return new Promise((resolve,reject)=>{
      axios.delete(url,header)
      .then(res=>{
        resolve(res.data)
        console.log(res.data.data)
        Swal.fire({
          title:'Əməliyyat uğurla yerinə yetirildi.',
          icon:'success',
          text:res.data.data.message,
         })
      })
      .catch(err=>{
        console.log(err.response.data)
        ErrorHandle(err.response.data)
      })
  })
 }

export {Get,Post,Delete}