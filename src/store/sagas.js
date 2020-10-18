import {takeEvery, call, put} from "redux-saga/effects"
import actionSetCurrent from "./actions/actionSetCurrent";
import {GET_CURRENT} from "./actions/actionTypes"

async function fetchData(url){
    const response = await fetch(url);
    return await response.json()
}

function* workerGetCurrent(action){
    const data = yield call(fetchData, action.payload)
    yield put(actionSetCurrent(data))
}

export function* watchGetCurrent(){
    yield takeEvery(GET_CURRENT, workerGetCurrent)
}