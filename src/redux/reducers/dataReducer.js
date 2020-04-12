import {SET_COMMENTS, LIKE_COMMENT, UNLIKE_COMMENT, LOADING_DATA} from '../types';

const initialState = {
    comments: [],
    comment: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            }
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        case LIKE_COMMENT:
        case UNLIKE_COMMENT:
            let index = state.comments.findIndex(
                (comment) => comment.commentId === action.payload.commentId
            );
            state.comments[index] = action.payload;
            return {
                ...state
            }
        default: 
            return state;
            
    }
}