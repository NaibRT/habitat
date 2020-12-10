import {REGISTER_USER,
        REGISTER_USER_SUCCESS,
        REGISTER_USER_FAİLED} from './actionTypes'




export const RegisterUser = (data)=>{
  return {
      type:REGISTER_USER,
      payload:{data}
  }
}

export const RegisterUserSuccess = (data)=>{
 return {
     type:REGISTER_USER_SUCCESS,
     payload:data
 }
}   

 export const RegisterUserFailed = (data)=>{
 return {
     type:REGISTER_USER_FAİLED,
     payload:data
 }
}

        