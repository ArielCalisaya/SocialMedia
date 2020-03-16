import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/signin', userData)
            .then((res) => {
                setAuthHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS});
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/signup', newUserData)
            .then((res) => {
                setAuthHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS});
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBTokenId');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

const setAuthHeader = (token)  => {
    const FBTokenId = `Bearer ${token}`;
        localStorage.setItem('FBTokenId', FBTokenId);
        axios.defaults.headers.common['Authorization'] = FBTokenId;
}