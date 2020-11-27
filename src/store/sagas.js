import { takeEvery, call, put, take, select } from "redux-saga/effects";
import {
    actionSetCurrent,
    actionClearFavorites,
    actionLoginUser,
    actionSetFavorites
} from "./actions/actions.js";
import { GET_CURRENT, LOGIN, LOGOUT, ADD_FAVORITES } from "./actions/actionTypes";
import { API_KEY } from "../const";
import Cookies from "js-cookie";



// ---------- Current Film
async function fetchData({ page, sort, searchText }) {
    const sortUrl = sort ? `&sort_by=${sort}` : "";
    const searchUrl = searchText ? `&with_keywords=${searchText}` : "";
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US${sortUrl}&page=${page}${searchUrl}`;

    const response = await fetch(url);
    return await response.json();
}

function* workerGetCurrent(action) {
    const defaultList = yield select((store) => store.defaultListFilms);

    const data = yield call(fetchData, { ...action.payload, defaultList });
    yield put(actionSetCurrent(data));
}

export function* watchGetCurrent() {
    yield takeEvery(GET_CURRENT, workerGetCurrent);
}

// ------ LOGIN
async function loginUser(userLoggedIn) {
    if (userLoggedIn) return Cookies.getJSON("user");
}

function* workerLogin(payload) {
    const dataUser = yield call(loginUser, payload);

    yield put(actionLoginUser(dataUser));
}

export function* watchLogin() {
    while (true) {
        const user = yield select((store) => store.user);

        if (!user?.login) {
            const { payload } = yield take(LOGIN);
            yield call(workerLogin, payload);
        }

        yield take(LOGOUT);

        Cookies.remove("user", { path: "" });
        Cookies.remove("token", { path: "" });

        yield put(actionClearFavorites());
    }
}


// ------------- Favorite
async function  setFavorits(id){
    const response = await fetch("http://localhost:4000/favorite/set",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.getJSON("token")}`
            },
              body: JSON.stringify({film_id: id}),
        });
        
        if(response.status === 200){
            return await response.json();
        }
}
function* workerSetFavorites(action){

    const data = yield call(setFavorits, action.payload);

    if(data){
        yield put(actionSetFavorites(data));
    }
}

export function* watchSetFavorits(){
    yield takeEvery(ADD_FAVORITES, workerSetFavorites);
}

