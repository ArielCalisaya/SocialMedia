import {
  SET_COMMENTS,
  SET_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  LOADING_DATA,
  POST_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  comments: [],
  comment: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };

    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload
      };

    case LIKE_COMMENT:
    case UNLIKE_COMMENT:
      let index = state.comments.findIndex(
        (comment) => comment.commentId === action.payload.commentId
      );
      state.comments[index] = action.payload;
      if (state.comment.commentId === action.payload.commentId) {
        state.comment = action.payload;
      }
      return {
        ...state
      };
      
      case DELETE_COMMENT:
        index = state.comments.findIndex(
          (comment) => comment.commentId === action.payload
        );
        state.comments.splice(index, 1);
        return {
          ...state
        };

      case POST_COMMENT:
      return {
          ...state,
          comments: [ action.payload, ...state.comments ]
      };
      
      default:
      return state;
  }
}
