import {REGISTER_USER } from './actionTypes';

const initialState = {
    registrationError: null, message: null, loading: false
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            state = {
                ...state,
                loading: true
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;