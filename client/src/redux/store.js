import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { carsReducer } from './reducers/carsReducer';
import { alertReducer } from './reducers/alertReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    carsReducer,
    alertReducer,
    bookingsReducer,
})

const store = createStore(
   rootReducer,
   composeEnhancers(
    applyMiddleware(thunk)
   
  )
);

export default store;