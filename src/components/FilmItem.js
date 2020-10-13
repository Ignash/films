import React from "react";
import { IMAGE_SIZE } from "../const";
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";

const ItemFilm = styled.section`
    width: 220px;
    margin: 20px 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
    &:hover{
        transform: scale(1.05);
    }
    transition: 0.3s;

`;

const Desccriptions = styled.div`
    padding: 10px;
    p{
        color: rgba(0, 0, 0, 0.6);
    }
    h3{
        margin: 0 0 10px 0;
    }
`;

export default function FilmItem({ filmItem }) {

    let srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.small}${filmItem?.poster_path}`;

    return (
        <ItemFilm>
            <Link to={`/film/${filmItem.id}`}>
                <img src={srcImg} />
                <Desccriptions>
                    <h3>{filmItem?.title}</h3>
                    <p>{filmItem?.release_date}</p>
                </Desccriptions>
            </Link>
        </ItemFilm>
    );
}
