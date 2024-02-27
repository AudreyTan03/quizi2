import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Correct import statement
// import { productListReducer, productDetailsReducer } from './reducers/productsReducer';
import { userLoginReducer, userRegisterReducer, userVerifyOtpReducer, userSendChangepasswordReducer, userConfirmChangepasswordReducer } from './reducers/userReducers';

// Define rootReducer using combineReducers
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userVerifyOtp: userVerifyOtpReducer,
    usersendChangepassword: userSendChangepasswordReducer,
    userConfirmChangepassword: userConfirmChangepasswordReducer,
});

// Retrieve cartItems and userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

const middleware = [thunk];

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export default store;