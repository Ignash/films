import styled from "@emotion/styled";
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { InputField } from "../styled_component/InputField";
import { UserContext } from "../context//contexts";
import store from "../store/store"
import actionSetUser from "../store/actions/actionSetUser";

const WrapperBlock = styled.form`
    width: 400px;
    margin: 20px auto;
    padding: 15px 25px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: right;

    button {
        border-color: rgb(138 230 253);
        color: #fff;
        background-color: rgb(138 230 253);
        border-radius: 5px;
        padding: 6px 10px;
        transition: 0.2s;
    }
    button:hover {
        background-color: #01b4e4;
    }
`;
const WrapperInputField = styled.div`
    position: relative;
`;
const Paragraf = styled.p`
    position: absolute;
    left: 35px;
    top: 6px;
    transition: 0.3s;
    color: #cccccc;
    &.label-focus {
        top: -20px !important;
        color: #000 !important;
    }
    &.notValidName:after {
        content: " must contain only letters";
        color: red;
        // height: 50px;
        // width: 50px;
    }
    &.notValidPassword:after {
        content: " must contain at least 5 characters";
        color: red;
        // height: 50px;
        // width: 50px;
    }
`;

export default function Login() {
    const [login, setLogin] = useState(false);
    const {loginUser} = useContext(UserContext)

    const handlerOnFocus = (event) => {
        event.target.previousSibling.classList.add("label-focus");
        event.target.previousSibling.classList.remove("notValidName");
        event.target.previousSibling.classList.remove("notValidPassword");

        event.target.classList.remove("notValid");
    };
    const handlerOnBlur = (event) => {
        if (!event.target.value) {
            event.target.previousSibling.classList.remove("label-focus");
        }
    };
    const validationName = (event) => {
        let target = event.target ? event.target : event;
        if (!/[A-Za-z]+/.test(target.value)) {
            target.classList.add("notValid");
            target.previousSibling.classList.add("notValidName");
        }
    };
    const validationPassword = (event) => {
        let target = event.target ? event.target : event;
        if (target.value.length < 5) {
            target.previousSibling.classList.add("notValidPassword");
            target.classList.add("notValid");
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const password = event.target.elements.password.value;
        let nameValid = true;
        let passwordValid = true;
        if (!/[A-Za-z]+/.test(name)) {
            validationName(event.target.elements.name);
            nameValid = false;
        }
        if (password.length < 5) {
            validationPassword(event.target.elements.password);
            passwordValid = false;
        }

        if (nameValid && passwordValid) {

            let status =
                name === "admin" && password === "admin" ? "admin" : "user";
            // localStorage.setItem("user", JSON.stringify({ name, password, status}));
            // localStorage.setItem("favorits", JSON.stringify([]));

            setLogin(true);
            loginUser();
            store.dispatch(actionSetUser({ name, password, status}))
        }
    };

    return !login ? (
        <WrapperBlock onSubmit={submitHandler}>
            <WrapperInputField>
                <Paragraf>Name</Paragraf>
                <InputField
                    onFocus={handlerOnFocus}
                    onBlur={(event) => {
                        handlerOnBlur(event);
                        validationName(event);
                    }}
                    name="name"
                />
            </WrapperInputField>
            <WrapperInputField>
                <Paragraf>Password</Paragraf>
                <InputField
                    type="password"
                    onFocus={handlerOnFocus}
                    onBlur={(event) => {
                        handlerOnBlur(event);
                        validationPassword(event);
                    }}
                    name="password"
                />
            </WrapperInputField>
            <button type="submit">Login</button>
        </WrapperBlock>
    ) : (
        <Redirect to="/" />
    );
}
