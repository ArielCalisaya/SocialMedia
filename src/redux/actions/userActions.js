import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER} from '../types';
import axios from 'axios';
import { bindActionCreators } from 'redux';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios
        .post('/signin', userData)
            .then((res) => {
                const FBTokenId = `Bearer ${res.data.token}`;
                localStorage.setItem('FBTokenId', FBTokenId);
                axios.defaults.headers.common['Authorization'] = FBTokenId;
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