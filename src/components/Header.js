import React from "react";
import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {  actionLogoutUser } from "../store/actions/actions";


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

function Header({ user, color, logoutUser }) {
    let history = useHistory();

    const HeaderPage = styled.header`
    width: 100%;
    // background: rgb(138 230 253);
    background: ${color};

    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

    return (
        <HeaderPage color={color}>
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
                                history.push('/');
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

const mapDispatchToProps = (dispatch)=>({
    logoutUser:  ()=> dispatch(actionLogoutUser())
});

const mapStateToProps = (state) => ({
    user: state.user,
    color: state.headerColor
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
