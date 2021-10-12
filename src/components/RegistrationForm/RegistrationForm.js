import React from "react";

import { FlexRow, FlexRowSpacer } from "../form/FlexRow/FlexRow";
import LoginLink from "./LoginLink/LoginLink";

import "./RegistrationForm.css";
import { Container, Paper, styled, TextField, Typography } from "@material-ui/core";
import SubmitButton from "../SubmitButton/SubmitButton";

const RegistrationFormPaper = styled(Paper)({
    width: "520px",
    padding: "48px 0",
    borderRadius: "20px"
});

const RegistrationFormContainer = styled(Container)({
    display: "flex",
    padding: "0 102px 0 98px",
    alignItems: "center",
    flexDirection: "column"
});

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
            <RegistrationFormPaper className="RegistrationForm" elevation={5}>
                <RegistrationFormContainer maxWidth="lg">
                    <Typography variant="h4">Регистрация</Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Адрес электронной почты"
                            name="email"
                        />
                        <FlexRow>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Имя"
                                name="name"
                            />
                            <FlexRowSpacer />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Фамилия"
                                name="surname"
                            />
                        </FlexRow>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                        />

                        <SubmitButton>Зарегистрироваться</SubmitButton>
                    </form>
                    <LoginLink changeTab={this.props.changeTab} />
                </RegistrationFormContainer>
            </RegistrationFormPaper>
        );
    }
}
