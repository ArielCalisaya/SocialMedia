import { 
        SET_COMMENTS, 
        LOADING_DATA, 
        LIKE_COMMENT, 
        UNLIKE_COMMENT,
        DELETE_COMMENT 
    } from '../types';
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
export const likeComment = (commentId) => (dispatch) => {
    axios.get(`/comment/${commentId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// Unlike
export const unlikeComment = (commentId) => (dispatch) => {
    axios.get(`/comment/${commentId}/unLike`)
        .then(res => {
            dispatch({
                type: UNLIKE_COMMENT,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const deleteComment = (commentId) => (dispatch) => {
    axios.delete(`/comment/${commentId}`)
        .then(() => {
            dispatch({
                type: DELETE_COMMENT,
                payload: commentId
            })
            .catch(err => console.log(err))
        })
}