import { takeEvery, call, put, take } from "redux-saga/effects";
import actionLoginUser from "./actions/actionLoginUser";
import actionSetCurrent from "./actions/actionSetCurrent";
import { GET_CURRENT, LOGIN, LOGOUT } from "./actions/actionTypes";

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

function* workerGetCurrent(action) {
    const data = yield call(fetchData, action.payload);
    yield put(actionSetCurrent(data));
}

export function* watchGetCurrent() {
    yield takeEvery(GET_CURRENT, workerGetCurrent);
}

export function* watchLogin() {
    while (true) {
        const action = yield take(LOGIN);
        let status = action.payload.name === "admin" ? "admin" : "user";
        localStorage.setItem("user", JSON.stringify({...action.payload, status: status}));
        localStorage.setItem("favorits", JSON.stringify([]));
        yield put(actionLoginUser({...action.payload, status: status}));
        yield take(LOGOUT);
        localStorage.clear();
    }
}
