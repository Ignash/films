import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Redirect, useParams } from "react-router-dom";
import { API_KEY, IMAGE_SIZE } from "../const";
import FilmVideo from "./FilmVideo";
import Loader from "./Loader";
import Reviews from "./Reviews";

const Section = styled.section`
    max-width: 900px;
    margin: 0 auto;
    padding: 15px;
    background: rgb(147 191 202 / 14%);
`;

const Info = styled.div`
    display: flex;
`;

const Poster = styled.div`
    height: 450px;
    min-width: 250px;
    img {
        height: 100%;
        width: auto;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;
const Description = styled.div`
    padding: 5px 30px;
    min-width: 250px;
    max-width: 540px;
    h2 {
        margin-bottom: 20px;
    }
    p:not(:last-child) {
        color: rgba(0, 0, 0, 0.6);
        text-align: right;
    }
    p:last-child {
        margin-top: 20px;
    }
`;

const Video = styled.div`
    margin: 0 auto;
`;

const NotFound = styled.p`
    text-align: center;
    margin-top: 50px;
`;

export default function FilmById() {
    const { id } = useParams();
    const [filmData, setFilmData] = useState();
    const [status, setStatus] = useState(200);

    let srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.medium}${filmData?.poster_path}`;

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => {
                if (response.status === 404) {
                    setStatus(404);
                    return null;
                }
                return response.json();
            })
            .then((filmData) => {
                setFilmData(filmData);
            });
    }, [id]);

    return filmData ? (
        <Section>
            <Info>
                <Poster>
                    {filmData?.poster_path ? (
                        <img src={srcImg} alt="poster" />
                    ) : (
                        <NotFound>Poster not found</NotFound>
                    )}
                </Poster>
                <Description>
                    <h2>{filmData?.title}</h2>
                    <p>{filmData?.release_date}</p>
                    <p>
                        {filmData?.genres
                            ?.map((genre) => genre.name)
                            .join(", ")}
                    </p>
                    <p>{filmData?.overview}</p>
                </Description>
            </Info>
            <FilmVideo videoId={id} />
            <Video></Video>
            <Reviews id={id} />
        </Section>
    ) : status === 404 ? (
        <Redirect to="/page404" />
    ) : (
        <Loader />
    );
}
