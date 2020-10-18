import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducers/rootReducer';
import initialState from './initialState';


// function createThunkMiddleware(extraArgument) {
//     return ({ dispatch, getState }) => {
//         console.log("1 state", getState());
//         return (next) => {
//         console.log("2 state", getState());
//             return (action) => {
//                 console.log("3 state", getState());
//                 if (typeof action === 'function') {
//                     console.log(2);
//                     return action(dispatch, getState, extraArgument);
//                 }
//                 console.log("action", action);
                
//                 return next(action);
//     };}}
//   }
  
//   const thunk = createThunkMiddleware();
//   thunk.withExtraArgument = createThunkMiddleware;

const store  = createStore(rootReducer, initialState, applyMiddleware ( thunk ));

export default store;