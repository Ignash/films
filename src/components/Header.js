import React from "react";
import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";

const HeaderPage = styled.header`
    width: 100%;
    background: rgb(138 230 253);
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Sign = styled.div`
    padding: 30px;
    span {
        padding-right: 25px;
    }
    button {
        color: #484848;
    }
    button:hover {
        color: #000;
    }
`;

const Navigation = styled.nav`
    height: 100%;
    ul {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li {
        padding: 0 30px;
    }
    a {
        color: #484848;
        &:hover {
            color: #000;
        }
        transition: 0.15s;
    }
    li:not(:last-child) {
        border-right: 1px solid;
    }
`;

export default function Header({ user, logoutUser }) {
    return (
        <HeaderPage>
            <Navigation>
                <ul>
                    <li>
                        <NavLink activeClassName="active" exact to="/">
                            Films
                        </NavLink>
                    </li>
                    {(user.status === "user" || user.status === "admin") && (
                        <li>
                            <NavLink activeClassName="active" to="/favorits">
                                Favorites
                            </NavLink>
                        </li>
                    )}
                    {user.status === "admin" && (
                        <li>
                            <NavLink
                                activeClassName="active"
                                exact
                                to="/admin/edit">
                                Edit
                            </NavLink>
                        </li>
                    )}
                </ul>
            </Navigation>
            <Sign>
                {user.name ? (
                    <>
                        <span>{user.name}</span>
                        <button
                            onClick={() => {
                                logoutUser();
                            }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                )}
            </Sign>
        </HeaderPage>
    );
}
