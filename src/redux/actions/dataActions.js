import { 
        SET_COMMENTS, 
        LOADING_DATA, 
        STOP_LOADING_UI,
        LIKE_COMMENT, 
        UNLIKE_COMMENT,
        POST_COMMENT,
        DELETE_COMMENT, 
        LOADING_UI,
        SET_COMMENT,
        SET_ERRORS,
        CLEAR_ERRORS
    } from '../types';
import axios from 'axios';

/*------------------------------------------------
                    Get Comments
------------------------------------------------*/
export const getComments = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/comments')
    .then(res => {
        dispatch({
            type: SET_COMMENTS,
            payload: res.data      
        })
    })
    .catch(() => {
        dispatch({
            type: SET_COMMENTS,
            payload: []
        })
    })
}

/*------------------------------------------------
                  Post Comment
------------------------------------------------*/
export const postComment = (newComment) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/newComment', newComment)
        .then(res => {
            dispatch({
                type: POST_COMMENT,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

/*------------------------------------------------
                  Get One Comment
------------------------------------------------*/
export const getComment = (commentId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.get(`/comment/${commentId}`)
    .then(res => {
        dispatch({
            type: SET_COMMENT,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
}


/*------------------------------------------------
                        Like
------------------------------------------------*/
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

/*------------------------------------------------
                       Unlike
------------------------------------------------*/
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





/*---------------------------------- ⚠ Problems - Delete Comment ⚠ -----------------------------------

    Problema con redux al eliminar el post no ocurre nada por parte de frontend pero si funciona por
    parte de backend, por lo que al actualizar se borra por completo pero no no esta siendo ocurriendo
    interaccion por parte de frontends
                
-----------------------------------------------------------------------------------------------------*/
export const deleteComment = (commentId) => (dispatch) => {
    axios
        .delete(`/comment/${commentId}`)
        .then(() => {
            dispatch({ 
                type: DELETE_COMMENT, 
                payload: commentId 
            })
        })
        .catch((err) => console.log(err))
}