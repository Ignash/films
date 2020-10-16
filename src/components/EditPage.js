import React from "react";
import WrapperSelect from "../styled_component/WrapperSelect";
import store from "../store/store";
import actionSetDefaultList from "../store/actions/actionSetDefaultList";

export default function EditPage() {
    return (
        <WrapperSelect>
            <span>Films list when opened:</span>
            <select
                defaultValue={store.getState().defaultListFilms}
                onChange={(event) => {
                    store.dispatch(actionSetDefaultList(event.target.value));
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
