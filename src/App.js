import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import FilmById from "./components/FilmById"
import Search from "./components/Search"
import Header from "./components/Header";
import FilmsPlaying from "./components/FilmsPlaying";


function App() {

    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <FilmsPlaying />
          </Route>
          <Route path="/film/:id">
            <FilmById />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
      );
}

export default App;
