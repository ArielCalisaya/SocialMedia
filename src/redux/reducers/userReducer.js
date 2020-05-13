import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED , LIKE_COMMENT, UNLIKE_COMMENT, LOADING_USER } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        case LOADING_USER: 
            return {
                ...state,
                loading: true
            };
        case LIKE_COMMENT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        commentId: action.payload.commentId
                    }
                ]
            }
        case UNLIKE_COMMENT:
            return {
                ...state,
                likes:
                    state.likes.filter(
                        (like) => like.commentId !== action.payload.commentId
                    )
            };
        default:
            return state;
    }
}