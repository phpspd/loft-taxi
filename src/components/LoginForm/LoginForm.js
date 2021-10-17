import React from "react";
import PropTypes from "prop-types";

import RegistrationLink from "./RegistrationLink/RegistrationLink";
import SubmitButton from "../SubmitButton/SubmitButton";

import "./LoginForm.css";
import { styled, Container, Paper, TextField, Typography } from "@material-ui/core";
import { withAuth } from "../../contexts/AuthContext/AuthContext";
import { withNavigation } from "../../contexts/NavigationContext/NavigationContext";

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

export class LoginForm extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        logIn: PropTypes.func,
        navigateTo: PropTypes.func.isRequired
    }

    componentDidUpdate() {
        if (this.props.isLoggedIn) {
            this.props.navigateTo("Map");
        }
    }

    authenticate = event => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!email || !password || typeof this.props.logIn !== "function") {
            return ;
        }

        this.props.logIn(email, password);
    }

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }

        return (
            <LoginFormPaper className="LoginForm" elevation={5}>
                <LoginFormContainer maxWidth="lg">
                    <Typography variant="h4">Войти</Typography>
                    <form onSubmit={this.authenticate} data-testid="LoginForm-form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Имя пользователя"
                            name="email"
                            placeholder="email@example.com"
                            data-testid="TextField-email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                            placeholder="*********"
                            data-testid="TextField-password"
                        />
                        <SubmitButton>Войти</SubmitButton>
                    </form>
                    <RegistrationLink />
                </LoginFormContainer>
            </LoginFormPaper>
        );
    }
}

export default withNavigation(withAuth(LoginForm));
