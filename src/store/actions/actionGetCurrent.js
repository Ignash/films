import {GET_CURRENT} from "./actionTypes"

export default function actionGetCurrent(url) {
    return {
        type: GET_CURRENT, 
        payload: url
    }
}
