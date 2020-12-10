import Axios from 'axios'


const UserRegisterHelper=(url,data)=>{
       let token=JSON.parse(localStorage.getItem('authUser'));
 return Axios.post(`${process.env.REACT_APP_API_URL}/${url}`,data,{
    headers:{
     'Content-Type':'application/json',
     'Authorization':`bearer ${token.token}`
    }
 }).then(res=>{
  if (res.status >= 200 || res.status <= 299)
  return res.data;
throw res.data;
}).catch(err=>{
  throw err[1]
})
}


export {UserRegisterHelper}