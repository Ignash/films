import React, { useState } from "react";
import { DefaultListFilmsContext } from "./contexts";

export default function DefaultListProvider({ children }) {
    const [defaultListFilms, setDefaultListFilms] = useState("now_playing");
    const changeDefaultListFilms = (value) => {
        setDefaultListFilms(value);
    };
    return (
        <DefaultListFilmsContext.Provider
            value={{ defaultListFilms, changeDefaultListFilms }}
        >
            {children}
        </DefaultListFilmsContext.Provider>
    );
}
