import { SET_FAVORITES } from './actionTypes';

export default function actionSetFavorites(value){
    return {
        type: SET_FAVORITES,
        payload: value
    }
}