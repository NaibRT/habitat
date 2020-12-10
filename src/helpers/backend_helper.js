import Axios from 'axios'


const PostUserJWTLogin=(url,data)=>{
 
    let postUrl=`${process.env.REACT_APP_API_URL}/${url}/`
    return Axios.post(postUrl,JSON.stringify(data),{
        headers:{
            "accept": "application/json",
            'Content-Type':'application/json'
        }
    })
    .then(res=>{
     if (res.status >= 200 || res.status <= 299)
        return res.data;
     throw res.data;
    }).catch(err=>{
        throw err[1]
    })
}

export {PostUserJWTLogin}

