import styled from "@emotion/styled";
import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { InputField } from "../styled_component/InputField";
import {actionLoginUser} from "../store/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";

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
        background-color: #01b4e4;
        border-radius: 5px;
        padding: 6px 10px;
        transition: 0.2s;
    }
    button:hover,
    button:disabled {
        background-color: rgb(138 230 253);
    }
`;
const WrapperInputField = styled.div`
    position: relative;
`;
const Paragraf = styled.label`
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
    }
    &.notValidPassword:after {
        content: " must contain at least 5 characters";
        color: red;
    }
`;

export default function Login() {
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [validForm, setValidForm] = useState(false);

    const refName = useRef();
    const refPassword = useRef();

    const validationNameValue = (value) => {
        return /[A-Za-z]+/.test(value);
    };
    const validationPasswordValue = (value) => {
        return value && value.length >= 5;
    };

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
    const handlerOnChange = (event) => {
        if (event.target.name === "name") {
            setUser((prev) => ({ ...prev, name: refName.current.value }));
        }
        if (event.target.name === "password")
            setUser((prev) => ({...prev, password: refPassword.current.value,}));
    };
    const validationName = () => {
        let target = refName.current;
        if (!validationNameValue(target.value)) {
            target.classList.add("notValid");
            target.previousSibling.classList.add("notValidName");
        }
    };

    const validationPassword = () => {
        let target = refPassword.current;
        if (!validationPasswordValue(target.value)) {
            target.previousSibling.classList.add("notValidPassword");
            target.classList.add("notValid");
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();

        const name = refName.current.value;
        const password = refPassword.current.value;

        if (validationNameValue(name) && validationPasswordValue(password)) {
            dispatch(actionLoginUser(user));
        }
    };

    useEffect(() => {
        setValidForm(validationNameValue(user.name) && validationPasswordValue(user.password));
    }, [user]);

    return !loginUser.name ? (
        <WrapperBlock onSubmit={submitHandler}>
            <WrapperInputField>
                <Paragraf>Name</Paragraf>
                <InputField
                    onFocus={handlerOnFocus}
                    onBlur={(event) => {
                        handlerOnBlur(event);
                        validationName(event);
                    }}
                    onChange={(event) => handlerOnChange(event)}
                    name="name"
                    ref={refName}
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
                    onChange={(event) => handlerOnChange(event)}
                    name="password"
                    ref={refPassword}
                />
            </WrapperInputField>
            <button type="submit" disabled={!validForm}>
                Login
            </button>
        </WrapperBlock>
    ) : (
        <Redirect to="/" />
    );
}
