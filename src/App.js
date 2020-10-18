import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import "./App.css";
import FilmById from "./components/FilmById";
import Search from "./components/Search";
import Header from "./components/Header";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import EditPage from "./components/EditPage";
import FavoritsFilms from "./components/FavoritsFilms";
import FilmsPlaying from "./components/FilmsPlaying";

import store from "./store/store"

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={FilmsPlaying} />
                <Route
                    path="/admin/edit"
                    render={() =>
                        store.getState().user.status === "admin" ? (
                            <EditPage />
                        ) : (
                            <Redirect to="/" />
                        )
                    }/>
                <Route path="/film/:id" component={FilmById} />
                <Route path="/search" component={Search} />
                <Route path="/page404" component={Page404} />
                <Route path="/login" component={Login} />
                <Route path="/favorits" component={FavoritsFilms} />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default App;
