import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED
} from "../types";
import axios from "axios";

/*------------------------------------------------
                       Login
------------------------------------------------*/
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signin", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

/*------------------------------------------------
                   Registration
------------------------------------------------*/
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

/*------------------------------------------------
                     Get User
------------------------------------------------*/
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

/*------------------------------------------------
                  Profile Picture
------------------------------------------------*/
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
  .then(() => {
    dispatch(getUserData());
  })
  .catch( err => console.log(err))
}

/*------------------------------------------------
                   Edit Details
------------------------------------------------*/
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user', userDetails)
  .then(() => {
    dispatch(getUserData());
  })
  .catch(err => console.log(err));
}

/*------------------------------------------------
                   Logout Account
------------------------------------------------*/
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBTokenId");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};


/*------------------------------------------------
                Token / Credentials
------------------------------------------------*/
const setAuthorizationHeader = token => {
  const FBTokenId = `Bearer ${token}`;
  localStorage.setItem("FBTokenId", FBTokenId);
  axios.defaults.headers.common["Authorization"] = FBTokenId;
};
