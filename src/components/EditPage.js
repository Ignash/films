import React, {useContext} from "react";
import WrapperSelect from "../styled_component/WrapperSelect";
import { DefaultListFilmsContext } from "../context/contexts";


export default function EditPage() {
    const {defaultListFilms, changeDefaultListFilms } = useContext(DefaultListFilmsContext)

    return (
        <WrapperSelect>
            <span>Films list when opened:</span>
            <select defaultValue={defaultListFilms} onChange={(event)=>{changeDefaultListFilms(event.target.value)}}>
                <option value="latest">Latest</option>
                <option value="now_playing">Now Playing</option>
                <option value="popular">Popular</option>
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
            </select>
        </WrapperSelect>
    );
}
