import { SET_DEFAULT_LIST } from "../actions/actionTypes";
import initialState from "../initialState";

export default function defaultListReducer(state=initialState.defaultListFilms, action) {
    switch (action.type) {
        case SET_DEFAULT_LIST:
            return action.payload;

         default:
            return state;
    }
}