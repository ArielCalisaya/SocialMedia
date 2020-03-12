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

const composeEnchancers = 
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enchancer = composeEnchancers(applyMiddleware(...middleware))

const store = createStore(reduccers, initialState, enchancer);

export default store;