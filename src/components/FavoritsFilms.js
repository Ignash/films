import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API_KEY } from "../const";
import FilmList from "./FilmList";
import Loader from "./Loader";
import { connect } from "react-redux";
import mapStateToProps from "../store/mapStateToProps";

const NoFilmsPar = styled.p`
    text-align: center;
    margin: 100px;
    font-size: 2rem;
`;

function FavoritsFilms({ favoriteFilms, user }) {
    const [films, setFilms] = useState();

    useEffect(() => {
        const fetchArr = favoriteFilms.map((id) =>
            fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            ).then((response) => response.json())
        );
        Promise.all(fetchArr).then((data) => setFilms(data));
    }, [favoriteFilms]);
    return user.status === "user" || user.status === "admin" ? (
        <>
            {films ? (
                films?.length > 0 ? (
                    <FilmList films={{ results: films }} />
                ) : (
                    <NoFilmsPar>No favorits films</NoFilmsPar>
                )
            ) : (
                <Loader />
            )}
        </>
    ) : (
        <Redirect to="/" />
    );
}

export default connect(mapStateToProps("FavoritsFilms"), null)(FavoritsFilms);
