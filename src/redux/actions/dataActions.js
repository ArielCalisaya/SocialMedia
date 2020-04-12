import { SET_COMMENTS, LOADING_DATA, LIKE_COMMENT, UNLIKE_COMMENT } from '../types';
import axios from 'axios';

// get Comments func
export const getComments = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/comments')
    .then(res => {
        dispatch({
            type: SET_COMMENTS,
            payload: res.data
            
        })
    })

    .catch(err => {
        dispatch({
            type: SET_COMMENTS,
            payload: []
        })
    })
}


// Like


// Unlike