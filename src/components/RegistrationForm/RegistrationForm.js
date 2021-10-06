import React from "react";

import FormRow from "../form/FormRow/FormRow";
import InputText from "../form/InputText/InputText";
import InputPassword from "../form/InputPassword/InputPassword";
import LoginLink from "./LoginLink/LoginLink";

import "./RegistrationForm.css";

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const surname = event.target.surname.value;
        const name = event.target.name.value;
        const password = event.target.password.value;

        if (!email || !surname || !name || !password || typeof this.props.onSignedUp !== "function") {
            return ;
        }

        this.props.onSignedUp({ email });
    }

    render() {
        return (
            <div className="RegistrationForm">
                <div className="RegistrationForm-content">
                    <h4>Регистрация</h4>
                    <form onSubmit={this.onSubmit}>
                        <FormRow>
                            <InputText label="Адрес электронной почты" name="email" />
                        </FormRow>
                        <FormRow>
                            <InputText label="Имя" name="name" />
                            <div className="spacer"></div>
                            <InputText label="Фамилия" name="surname" />
                        </FormRow>
                        <FormRow>
                            <InputPassword name="password" />
                        </FormRow>

                        <button tabIndex="0" type="submit">
                            <span className="label">Зарегистрироваться</span>
                        </button>
                    </form>
                    <LoginLink changeTab={this.props.changeTab} />
                </div>
            </div>
        );
    }
}
