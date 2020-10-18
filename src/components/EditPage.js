import React from "react";
import WrapperSelect from "../styled_component/WrapperSelect";
import actionSetDefaultList from "../store/actions/actionSetDefaultList";
import { useDispatch, useSelector } from "react-redux";

export default function EditPage() {
    const defaultValue = useSelector(store=>store.defaultListFilms)
    const dispatch = useDispatch()
    return (
        <WrapperSelect>
            <span>Films list when opened:</span>
            <select
                defaultValue={defaultValue}
                onChange={(event) => {
                    dispatch(actionSetDefaultList(event.target.value));
                }}>
                <option value="latest">Latest</option>
                <option value="now_playing">Now Playing</option>
                <option value="popular">Popular</option>
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
            </select>
        </WrapperSelect>
    );
}
