import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';
import { watchGetCurrent, watchLogin } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store  = createStore(rootReducer, applyMiddleware ( sagaMiddleware ));

sagaMiddleware.run(watchGetCurrent)
sagaMiddleware.run(watchLogin)


export default store;