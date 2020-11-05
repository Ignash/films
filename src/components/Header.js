import React, {useState, useRef, useEffect} from "react";
import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {  actionLogoutUser } from "../store/actions/actions";
import UserData from "./UserData";


const Sign = styled.div`
    padding: 30px;
    span {
        padding-right: 25px;
    }

    button {
        color: #484848;
        padding: 0 5px;
    }

    button:hover {
        color: #000;
    }
    button:first-of-type{
        border-right: 0.3mm solid black;
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
    const history = useHistory();
    const [isShowUser, setIsShowUser] = useState(false);
    const refSign = useRef()


    const HeaderPage = styled.header`
        width: 100%;
        // background: rgb(138 230 253);
        background: ${color};

        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

    const showDataUser = (event)=>{
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        setIsShowUser((prev)=>{
            return !prev
        });
    };
    const handleClickOutside = (event)=> {
        setIsShowUser(false)
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <HeaderPage color={color} >
            <Navigation>
                <ul>
                    <li>
                        <NavLink activeClassName="active" exact to="/">
                            Films
                        </NavLink>
                    </li>
                    {(user?.role) && (
                        <li>
                            <NavLink activeClassName="active" to="/favorits">
                                Favorites
                            </NavLink>
                        </li>
                    )}
                    {user?.role === "admin" && (
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
            <Sign ref={refSign}>
                <div >
                    {user?.login ? (
                        <div>
                            <button onClick={showDataUser}>{user?.login}</button>
                            {isShowUser && <UserData user={user}/>}
                            <button
                                onClick={() => {
                                    history.push('/');
                                    logoutUser();
                                }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button>
                                <NavLink to="/login">Log In</NavLink>
                            </button>
                            <button>
                                <NavLink to="/registration">Sign Up</NavLink>
                            </button>
                        </>
                    )}
                </div>
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
