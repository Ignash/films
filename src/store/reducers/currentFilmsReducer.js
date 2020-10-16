import { SET_CURRENT } from "../actions/actionTypes";
import initialState from "../initialState";

export default function currentFilmsReducer(state=initialState.currentFilms, action) {
    switch (action.type) {
        case SET_CURRENT:
            return action.payload;

         default:
            return state;
    }
}
