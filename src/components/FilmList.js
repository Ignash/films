import React, { useEffect, useState } from 'react'
import FilmItem from './FilmItem'

export default function FilmList({films}){
    console.log(films)
    return (
        <div>
            {films.map(film=> <FilmItem key={film.id} filmItem={film}/>)}
            
        </div>
    )
}