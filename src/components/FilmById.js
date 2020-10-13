import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';
import { useParams } from "react-router-dom";
import { API_KEY, IMAGE_SIZE  } from "../const";
import FilmVideo from "./FilmVideo";

const Section = styled.section`
    max-width: 900px;
    margin: 0 auto;
    padding: 15px;
    background: rgb(147 191 202 / 14%);
`;

const Info = styled.div`
    display: flex;
`;

const Poster =styled.div`
    height: 450px;
    img{
        height: 100%;
        width: auto;
    }
`;
const Description =styled.div`
    padding: 5px 30px;
    min-width: 250px;
    max-width: 540px;
    h2{
        margin-bottom: 20px;
    }
    p:not(:last-child){
        color: rgba(0, 0, 0, 0.6);
        text-align: right;
    }
    p:last-child{
        margin-top: 20px
    }

`;

const Video = styled.div`
    margin: 0 auto;
`;


export default function FilmById({ match, location }) {
    const { id } = useParams();
    const [filmData, setFilmData] = useState();

    let srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.medium}${filmData?.poster_path}`;


     /*p/w1920_and_h800_multi_faces/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg
    https://image.tmdb.org/t/p/w220_and_h330_face/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg
    
    */

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((filmData) => {
                console.log(filmData);
                setFilmData(filmData);
            });
    }, [id]);

    

    return (
        <Section>
            <Info>
                <Poster>
                    <img src={srcImg} />
                </Poster>
                <Description>
                    <h2>{filmData?.title}</h2>
                    <p>{filmData?.release_date}</p>
                    <p>{filmData?.genres.map(genre=>genre.name).join(', ')}</p>
                    <p>{ filmData?.overview }</p>
                </Description>
            </Info>
                <FilmVideo videoId={id} />
            <Video>
            </Video>

        </Section>
    );
}
