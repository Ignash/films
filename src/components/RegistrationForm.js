import React from "react";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormWrapper from "../styled_component/FormWrapper";
import Button from "../styled_component/Button";
import FormInputField from "../components/FormInputField";

export default function RegistrationForm() {
    const history = useHistory();

    const registrationSchema = Yup.object({
        firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        login: Yup.string().required("Required"),
        password: Yup.string()
            .min(5, "Must be 5 characters or more")
            .required("Required"),
    });

    const submitHandler = async (dataUser, actions) => {
        const response = await fetch("http://localhost:4000/registration", {
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
        
        if (status === 201) {
            history.push("/login");
        } else {
            const data = await response.json();
            actions.setFieldError("login", data.message);
        }
    };

    return (
        <FormWrapper>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
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
                        <h3>Registration</h3>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component={FormInputField} />

                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component={FormInputField} />

                        <label htmlFor="email">Email Address</label>
                        <Field
                            name="email"
                            type="email"
                            component={FormInputField}
                        />

                        <label htmlFor="login">Login</label>
                        <Field name="login" component={FormInputField} />

                        <label htmlFor="password">Password</label>
                        <Field name="password" component={FormInputField} />

                        <Button
                            type="submit"
                            disabled={!(props.isValid && props.dirty)}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
}
