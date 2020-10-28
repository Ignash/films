import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import FilmItem from './FilmItem'

const ListFilm = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 50px;
    max-width: 1500px;
    margin: 0 auto;
`;

export default function FilmList(props) {
    const films = props.films?.results || [];
    const changePage = props.changePage;

    const [newFilmsList, setNewFilmsList] = useState([]);

    useEffect(() => {
        setNewFilmsList([...films]);
    }, [films]);

    return (
        
        <>
            <ListFilm>
                {newFilmsList.map((film) => (
                    <FilmItem key={film.id} filmItem={film} />
                ))}
            </ListFilm>
            {props.films?.page && (
                <Pagination
                    currentPage={props.films?.page}
                    totalPages={props.films?.total_pages}
                    changePage={changePage}
                />
            )}
        </> 
    );
}
