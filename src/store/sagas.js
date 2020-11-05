import { takeEvery, call, put, take, select } from "redux-saga/effects";
import {
    actionSetCurrent,
    actionClearFavorites,
    actionLoginUser,
} from "./actions/actions.js";
import { GET_CURRENT, LOGIN, LOGOUT } from "./actions/actionTypes";
import { API_KEY } from "../const";
import Cookies from "js-cookie";

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

async function loginUser(userLoggedIn) {
    // const response = await fetch("http://localhost:4000/login",{
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json;charset=utf-8',
    //         'Accept': 'application/json',
    //         'Origin': 'http://localhost:3000'
    //     },
    //       body: JSON.stringify(user),
    //       credentials: 'include'
    // });
    // if(response.status === 200){
    //     return await response.json();
    // }
    // return null

    if (userLoggedIn) return Cookies.getJSON("user");
}

function* workerLogin(payload) {
    const dataUser = yield call(loginUser, payload);

    localStorage.setItem("favorits", JSON.stringify([]));
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
        localStorage.clear();
    }
}
