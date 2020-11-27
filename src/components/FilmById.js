import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Redirect, useParams } from "react-router-dom";
import { API_KEY, IMAGE_SIZE } from "../const";
import FilmVideo from "./FilmVideo";
import Loader from "./Loader";
import Reviews from "./Reviews";
import defaultImg from "../publish/defaultImg.png";

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
const Section = styled.section`
    max-width: 900px;
    margin: 0 auto;
    padding: 15px;
    background: rgb(147 191 202 / 14%);
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

export default function FilmById({ filmId }) {
    const { id = filmId } = useParams();
    const [filmData, setFilmData] = useState(null);
    const [status, setStatus] = useState(200);
    let load = useRef(false);

    let srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.medium}${filmData?.poster_path}`;

    useEffect(() => {
        async function fetchData() {

            load.current = true;

            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            );

            let data;

            if (response.status === 404) {
                setStatus(404);
                data = null;
            } else {
                data = await response.json();
            }

            load.current = false;

            setFilmData(data);
        }

        fetchData();
    }, [id]);

    return !load.current ? (
        <Section>
            <Info>
                <Poster>
                    <img
                        src={filmData?.poster_path ? srcImg : defaultImg}
                        alt="poster"
                    />
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
        <>
            <Loader />
        </>
    );
}
