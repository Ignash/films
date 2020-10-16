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
import HeaderW from "./components/wrapper/HeaderW";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import EditPage from "./components/EditPage";
import UserProvider from "./context/UserProvider";
import DefaultListProvider from "./context/DefaultListProvider";
import FavoritsFilmsW from "./components/wrapper/FavoritsFilmsW";
import FilmsPlayingW from "./components/wrapper/FilmsPlayingW";

import store from "./store/store"

function App() {
    return (
        <Router>
            <UserProvider>
                <DefaultListProvider>
                    <HeaderW />
                    <Switch>
                        <Route exact path="/" component={FilmsPlayingW} />
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
                        <Route path="/favorits" component={FavoritsFilmsW} />
                        <Route component={Page404} />
                    </Switch>
                </DefaultListProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
