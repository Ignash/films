import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { actionLoginUser } from "../store/actions/actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import FormWrapper from "../styled_component/FormWrapper";
import Button from "../styled_component/Button";
import FormInputField from "../components/FormInputField";

function RegistrationForm({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const errorField = useRef();

    const registrationSchema = Yup.object({
        login: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                errorField.current?.classList.remove("showError");
                setTimeout(() => {
                    setErrorMessage(null);
                }, 500);
            }, 3000);
        }
    }, [errorMessage]);

    const submitHandler = async (dataUser) => {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Accept: "application/json",
                Origin: "http://localhost:3000",
            },
            body: JSON.stringify(dataUser),
            credentials: "include",
        });
        const status = response.status;
        if (status === 200) {
            dispatch(actionLoginUser(response.ok));
            history.push("/");
        } else {
            const data = await response.json();
            setErrorMessage(() => {
                setTimeout(() => {
                    errorField.current.classList.add("showError");
                }, 100);

                return data.message;
            });
        }
    };

    useEffect(() => {
        if (user?.userLogin) history.push("/");
    }, [user, history]);

    return (
        <FormWrapper>
            {errorMessage && (
                <div ref={errorField} className="errorMessage">
                    {errorMessage}
                </div>
            )}
            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                validationSchema={registrationSchema}
                onSubmit={(value, actions) => {
                    submitHandler(value, actions);
                }}
            >
                {(props) => (
                    <Form>
                        <label htmlFor="login">Login</label>
                        <Field name="login" component={FormInputField} />

                        <label htmlFor="password">Password</label>
                        <Field
                            name="password"
                            type="password"
                            component={FormInputField}
                        />
                        <Button
                            type="submit"
                            disabled={!(props.isValid && props.dirty)}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(RegistrationForm);
