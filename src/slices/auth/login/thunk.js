//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import axios from "axios";

export const loginUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('https://task360-dev.osc-fr1.scalingo.io/task-360/api/v1/auth/login', {
      userId: user.userId,
      password: user.password
    });

    const data = response;

    if (data.token) {
      sessionStorage.setItem('authToken', data.token);
      sessionStorage.setItem('userName', data.userName);
      sessionStorage.setItem('userEmail', data.email);
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('userRole', data.role);
      dispatch(loginSuccess(data));
      navigate('/dashboard');
    }
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';
    if(error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if(error.response && error.response.status) {
      errorMessage = 'Request failed. Please try again later.'
    } else if(error.message) {
      errorMessage= error.message;
    }
    dispatch(apiError({ data: errorMessage }));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    dispatch(logoutUserSuccess(true));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type, history) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/dashboard')
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};