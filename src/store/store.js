import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';
import { watchGetCurrent, watchLogin, watchSetFavorits } from './sagas';
import Cookies from "js-cookie";
import { actionSetInitState } from './actions/actions';

// import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware ( sagaMiddleware )));

sagaMiddleware.run(watchGetCurrent)
sagaMiddleware.run(watchLogin)
sagaMiddleware.run(watchSetFavorits)

setInitialState();

async function setInitialState(){
    const faiv = await fetchGetData("/favorite/get");
    const auth = await fetchGetData("/userAuth");
    const favoriteFilms = faiv || [];
    const user = auth ? Cookies.getJSON("user") : null;

    store.dispatch(actionSetInitState({favoriteFilms, user}))

}

async function fetchGetData(url) {
    const response = await fetch(`http://localhost:4000${url}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.getJSON("token")}`
        },
    })
        
    if (response.status === 200) {
        return await response.json();
    }
    
}

export default store;