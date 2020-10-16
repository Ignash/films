import React, { useState } from "react";
import { UserContext } from "./contexts";

export default function UserProvider({ children }) {
    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    };
    const getFavorits = () => {
        return JSON.parse(localStorage.getItem("favorits"));
    };

    const [user, setUser] = useState(getUser());
    const [favorits, setFavorits] = useState(getFavorits());

    const loginUser = () => {
        setUser(getUser);
        setFavorits(JSON.parse(localStorage.getItem("favorits")));
    };

    const addToFavorits = (id) => {
        localStorage.setItem("favorits", JSON.stringify([...favorits, id]));
        setFavorits((prevFav) => [...prevFav, id]);
    };
    
    const deleteFromFavorits = (id) => {
        setFavorits((prevFav) => {
            let copyFav = [...prevFav];
            copyFav.splice(prevFav.indexOf(id), 1);
            localStorage.setItem("favorits", JSON.stringify(copyFav));
            return copyFav;
        });
    };

    return (
        <UserContext.Provider
            value={{
                user,
                favorits,
                loginUser,
                addToFavorits,
                deleteFromFavorits,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
