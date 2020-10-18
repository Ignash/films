import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import initialState from './initialState';
import { watchGetCurrent } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store  = createStore(rootReducer, initialState, applyMiddleware ( sagaMiddleware ));

sagaMiddleware.run(watchGetCurrent)

export default store;