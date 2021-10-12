import React from "react";

import RegistrationLink from "./RegistrationLink/RegistrationLink";
import SubmitButton from "../SubmitButton/SubmitButton";

import "./LoginForm.css";
import { styled, Container, Paper, TextField, Typography } from "@material-ui/core";

const LoginFormPaper = styled(Paper)({
    width: "520px",
    padding: "48px 0",
    borderRadius: "20px"
});

const LoginFormContainer = styled(Container)({
    display: "flex",
    padding: "0 102px 0 98px",
    alignItems: "center",
    flexDirection: "column"
});

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password || typeof this.props.onLoggedIn !== "function") {
            return ;
        }

        this.props.onLoggedIn({ email });
    }

    render() {
        return (
            <LoginFormPaper className="LoginForm" elevation={5}>
                <LoginFormContainer maxWidth="lg">
                    <Typography variant="h4">Войти</Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Имя пользователя"
                            name="email"
                            placeholder="email@example.com"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                            placeholder="*********"
                        />
                        <SubmitButton>Войти</SubmitButton>
                    </form>
                    <RegistrationLink changeTab={this.props.changeTab} />
                </LoginFormContainer>
            </LoginFormPaper>
        );
    }
}
