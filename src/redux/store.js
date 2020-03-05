import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import UI_Reducer from "./reducers/UI_Reducer";

const initialState = {};

const middleware = [thunk];

const reduccers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: UI_Reducer
});

const store = createStore(
  reduccers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
