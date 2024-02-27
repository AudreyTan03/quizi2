import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_VERIFY_OTP_REQUEST,
    USER_VERIFY_OTP_SUCCESS,
    USER_VERIFY_OTP_FAIL,
    USER_SEND_CHANGE_PASSWORD_REQUEST,
    USER_SEND_CHANGE_PASSWORD_SUCCESS,
    USER_SEND_CHANGE_PASSWORD_FAIL,
    USER_CONFIRM_CHANGE_PASSWORD_REQUEST,
    USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
    USER_CONFIRM_CHANGE_PASSWORD_FAIL,
  } from "../constants/userConstants";
  export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
          'http://127.0.0.1:8000/api/register/',
            { username: username, email: email, password: password }, 
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));


        // Redirect logic here
        return data; // Return the data from the response

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
        // throw error; // Throw the error to be caught by the caller
    }
};

export const VerifyOtp = (user_id, otp_id, otp_code) => async (dispatch) => {
  try {
    console.log(user_id, otp_id, otp_code)
    dispatch({
      type: USER_VERIFY_OTP_REQUEST
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "api/verify-otp/",
      {user_id: user_id, otp_id: otp_id, otp_code: otp_code}, // Added comma here
      config
    )
    dispatch({
      type: USER_VERIFY_OTP_SUCCESS,
      payload: data,
    })
    return data
  } catch (error) {
    dispatch({
      type: USER_VERIFY_OTP_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}


  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/login/",
        { username: email, password: password },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };

  export const sendChangepassword = (password, password2, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_SEND_CHANGE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/changepassword/',
            { password, password2 },
            config
        );
        dispatch({
            type: USER_SEND_CHANGE_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_SEND_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const confirmChangepassword = (password, password2, uid, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_CONFIRM_CHANGE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/reset-password/${uid}/${token}`,
            { password, password2 },
            config
        );
        dispatch({
            type: USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_CONFIRM_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};
  
  // export const register = (name, email, password) => async (dispatch) => {
  //   try {
  //     dispatch({
  //       type: USER_REGISTER_REQUEST,
  //     });
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  
  //     const { data } = await axios.post(
  //       "/api/register/",
  //       { name: name, email: email, password: password },
  //       config
  //     );
  //     dispatch({
  //       type: USER_REGISTER_SUCCESS,
  //       payload: data,
  //     });
  
  //     dispatch({
  //       type: USER_LOGIN_SUCCESS,
  //       payload: data,
  //     })
  
  //     localStorage.setItem("userInfo", JSON.stringify(data));
  //   } catch (error) {
  //     dispatch({
  //       type: USER_REGISTER_FAIL,
  //       payload:
  //         error.response && error.response.data.message
  //           ? error.response.data.message
  //           : error.message,
  //     });
  //   }
  // };
  