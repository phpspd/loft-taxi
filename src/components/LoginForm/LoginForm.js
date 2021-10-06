import React from "react";

import FormRow from "../form/FormRow/FormRow";
import InputText from "../form/InputText/InputText";
import InputPassword from "../form/InputPassword/InputPassword";
import RegistrationLink from "./RegistrationLink/RegistrationLink";

import "./LoginForm.css";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if (!email || !password || typeof this.props.onLoggedIn !== "function") {
            return ;
        }

        this.props.onLoggedIn({ email });
    }

    render() {
        return (
            <div className="LoginForm">
                <div className="LoginForm-content">
                    <h4>Войти</h4>
                    <form onSubmit={this.onSubmit}>
                        <FormRow>
                            <InputText type="email" label="Имя пользователя" name="email" placeholder="email@example.com" />
                        </FormRow>
                        <FormRow>
                            <InputPassword name="password" />
                        </FormRow>
                        <button tabIndex="0" type="submit">
                            <span className="label">Войти</span>
                        </button>
                    </form>
                    <RegistrationLink changeTab={this.props.changeTab} />
                </div>
            </div>
        );
    }
}
