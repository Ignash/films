import { SET_CURRENT } from './actionTypes';

export default function actionSetCurrent(value){
    return {
        type: SET_CURRENT,
        payload: value
    }
}