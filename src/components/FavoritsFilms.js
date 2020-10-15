import styled from "@emotion/styled";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/contexts";
import { API_KEY } from "../const";
import FilmList from "./FilmList";
import Loader from "./Loader";

const NoFilmsPar = styled.p`
    text-align: center;
    margin: 100px;
    font-size: 2rem;
`;

export default function FavoritsFilms() {
    const { favorits } = useContext(UserContext);
    const [films, setFilms] = useState();

    useEffect(() => {
        const fetchArr = favorits.map((id) =>
            fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            ).then((response) => response.json())
        );
        Promise.all(fetchArr).then((data) => setFilms(data));
    }, [favorits]);
    return (
        <>
            {films ? <FilmList films={{ results: films }} /> : <Loader />}
            {films?.length === 0 && <NoFilmsPar>No favorits films</NoFilmsPar>}
        </>
    );
}
