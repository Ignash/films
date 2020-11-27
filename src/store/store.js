import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';
import { watchGetCurrent, watchLogin, watchSetFavorits } from './sagas';

import setInitialState from '../utils/setInitialState'

// import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware ( sagaMiddleware )));

sagaMiddleware.run(watchGetCurrent)
sagaMiddleware.run(watchLogin)
sagaMiddleware.run(watchSetFavorits)

setInitialState();



export default store;