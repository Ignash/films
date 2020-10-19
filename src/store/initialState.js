const initialState = {
    currentFilms: [],
    favoriteFilms: JSON.parse(localStorage.getItem("favorits")) || [],
    defaultListFilms: "now_playing",
    user: JSON.parse(localStorage.getItem("user")) || {name: null, password: null, status: null}
}

export default initialState;