import React  from 'react';
import { InputField } from '../styled_component/InputField'

const FormInputField = ({ field, form: { touched, errors } }) => (
    <>
        <InputField {...field} className={touched[field.name] &&
       errors[field.name] ? "notValid" : ""} type={field.name === "password" ? "password" : "text"} />
        { 
            touched[field.name] && 
            errors[field.name] && 
            <div className="error">{errors[field.name]}</div>
        }
    </>
)

export default FormInputField