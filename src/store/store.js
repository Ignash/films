import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import initialState from './initialState';
import { watchGetCurrent, watchLogin } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store  = createStore(rootReducer, initialState, applyMiddleware ( sagaMiddleware ));

sagaMiddleware.run(watchGetCurrent)
sagaMiddleware.run(watchLogin)


export default store;