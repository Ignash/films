import React, { useState, useEffect } from "react";
import FilmList from "./FilmList";
import { API_KEY } from "../const";


export default function FilmsPlaying() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        )
            .then((response) => response.json())
            .then((filmsData) => {
                setFilms(filmsData.results);
            });
    }, []);

    return <FilmList films={films} />;
}
