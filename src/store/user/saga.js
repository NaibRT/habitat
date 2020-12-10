import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
// Login Redux States
import {REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILED } from './actionTypes';
import {RegisterUser} from './action'
//Include Both Helper File with needed methods
import {UserRegisterHelper} from './helper';
import {apiError} from '../../store/auth/login/actions'



function* registerUser({ payload: { data } }) {
    try {
          if(process.env.REACT_APP_DEFAULTAUTH === "jwt")
          {  
           console.log(data)
             const response = yield call(UserRegisterHelper,'/auth/registration/',data)
             console.log(response)
            localStorage.setItem("authUser", JSON.stringify(response));
          yield put(REGISTER_USER_SUCCESS(response));
          }
         //history.push('/dashboard');
          
    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser)
}


function* userSaga() {
    yield all([
        fork(watchUserRegister)
    ]);
}

export default userSaga;