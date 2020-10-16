import { DEL_FAVORITE } from './actionTypes';

export default function actionDeleteFavorite(value){
    return {
        type: DEL_FAVORITE,
        payload: value
    }
}