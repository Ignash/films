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
import FilmsPlaying from "./components/FilmsPlaying";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import FavoritsFilms from "./components/FavoritsFilms";
import EditPage from "./components/EditPage";
import UserProvider from "./context/UserProvider";
import { UserContext } from "./context/contexts";
import DefaultListProvider from "./context/DefaultListProvider";

function App() {
    return (
        <Router>
            <UserProvider>
                <DefaultListProvider>
                    <Header />
                    <UserContext.Consumer>
                        {({ user }) => (
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={FilmsPlaying}
                                />
                                <Route
                                    path="/admin/edit"
                                    render={() =>
                                        user?.status === "admin" ? (
                                            <EditPage />
                                        ) : (
                                            <Redirect to="/" />
                                        )
                                    }
                                />
                                <Route path="/film/:id" component={FilmById} />
                                <Route path="/search" component={Search} />
                                <Route path="/page404" component={Page404} />
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/favorits"
                                    render={() =>
                                        user ? (
                                            <FavoritsFilms />
                                        ) : (
                                            <Redirect to="/" />
                                        )
                                    }
                                />
                                <Route component={Page404} />
                            </Switch>
                        )}
                    </UserContext.Consumer>
                </DefaultListProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
