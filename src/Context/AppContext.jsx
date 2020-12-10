import React, { createContext, useState, useEffect, Children } from 'react'
import axios from 'axios'

export const context=createContext();

function AppContext({Children}) {
   const [state, setstate] = useState({
    categories:[],
    groups:[]
   });

   const getDatas=()=>{
    let groups=[]
    let token=JSON.parse(localStorage.getItem('authUser'));
    axios.get(`${process.env.REACT_APP_API_URL}/auth/group/`,{
      headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
      }
  }).then(res=>{
      groups=res.data
  }).catch(err=>console.log(err))
    axios.get(`${process.env.REACT_APP_API_URL}/category_list/`,{
      headers:{
        'Authorization':token&&`${token.token_type}${token.access_token}`
      }
    }).then(res=>{
       let data=[];
     res.data.forEach(x=>
       data.push({id:x.id,label:x.name,value:x.name})
     );
     console.log(data);
     setstate({
        groups:groups,
        categories:data
     })
    }).catch(err=>console.log(err))
   }

   useEffect(()=>{
    getDatas();
   },[])

 return (
  <context.Provider value={state}>
    {Children}
  </context.Provider>
 )
}

export default AppContext;
