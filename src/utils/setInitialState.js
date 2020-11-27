import Cookies from "js-cookie";
import { actionSetInitState } from '../store/actions/actions';
import store from '../store/store'

export default async function setInitialState(){
    const faiv = await fetchGetData("/favorite/get");
    const auth = await fetchGetData("/userAuth");
    const favoriteFilms = faiv || [];
    const user = auth ? Cookies.getJSON("user") : null;

    store.dispatch(actionSetInitState({favoriteFilms, user}))

}

async function fetchGetData(url) {
    const response = await fetch(`http://localhost:4000${url}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.getJSON("token")}`
        },
    })
        
    if (response.status === 200) {
        return await response.json();
    }
    
}