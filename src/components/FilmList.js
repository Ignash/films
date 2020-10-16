import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import FilmItemW from './wrapper/FilmItemW'


const ListFilm = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 50px;
    max-width: 1500px;
    margin: 0 auto;
`;
const NotFound = styled.p`
    text-align: center;
    font-size: 2rem;
    margin: 50px 0;
`;

export default function FilmList(props) {
    const films = props.films?.results || [];
    const changePage = props.changePage;

    const [newFilmsList, setNewFilmsList] = useState([]);

    useEffect(() => {
        setNewFilmsList([...films]);
    }, [films]);

    const sortingList = (sort) => {
        switch (sort) {
            case "descending":
                setNewFilmsList(
                    [...films].sort((a, b) => {
                        let dateA = new Date(a.release_date).getTime();
                        let dateB = new Date(b.release_date).getTime();
                        return dateA - dateB;
                    })
                );
                break;
            case "ascending":
                setNewFilmsList(
                    [...films].sort((a, b) => {
                        let dateA = new Date(a.release_date).getTime();
                        let dateB = new Date(b.release_date).getTime();
                        return dateB - dateA;
                    })
                );
                break;

            case "AZ":
                setNewFilmsList(
                    [...films].sort((a, b) => {
                        let titleA = a.title.toLowerCase();
                        let titleB = b.title.toLowerCase();
                        if (titleA < titleB) return -1;
                        if (titleA > titleB) return 1;
                        return 0;
                    })
                );
                break;

            case "ZA":
                setNewFilmsList(
                    [...films].sort((a, b) => {
                        let titleA = a.title.toLowerCase();
                        let titleB = b.title.toLowerCase();
                        if (titleA > titleB) return -1;
                        if (titleA < titleB) return 1;
                        return 0;
                    })
                );
                break;

            default:
                break;
        }
    };

    return (
        newFilmsList.length>0 ?
        <>
            <Sorting sortingList={sortingList} />
            <ListFilm>
                {newFilmsList.map((film) => (
                    <FilmItemW key={film.id} filmItem={film} />
                ))}
            </ListFilm>
            {props.films?.page && (
                <Pagination
                    currentPage={props.films?.page}
                    totalPages={props.films?.total_pages}
                    changePage={changePage}
                />
            )}
        </> : <NotFound>Nothing found</NotFound>
    );
}
