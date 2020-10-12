import React from "react";
import { IMAGE_SIZE } from "../const";

export default function FilmItem({ filmItem }) {
    /*image
    https://image.tmdb.org/t/p/w220_and_h330_face/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg
    w600_and_h900_bestv2
    w300_and_h450_bestv2
  */
 console.log(filmItem)

    const srcImg = `https://image.tmdb.org/t/p/${IMAGE_SIZE.small}${filmItem?.poster_path}`;

    return (
        <section className="film-item">
            <div className="film-item__poster">
                <img src={srcImg} />
            </div>
            <div className="film-item__desccriptions">
                <h3 className="film-item__title">{filmItem?.title}</h3>
                <div className="film-item__date">{filmItem?.release_date}</div>
            </div>
        </section>
    );
}
