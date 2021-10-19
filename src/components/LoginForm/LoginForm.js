import React from "react";
import PropTypes from "prop-types";

import RegistrationLink from "./RegistrationLink/RegistrationLink";
import SubmitButton from "../SubmitButton/SubmitButton";

import "./LoginForm.css";
import { styled, Container, Paper, TextField, Typography } from "@material-ui/core";

import { authRequest, getLoginError } from "../../modules/user";
import { connect } from "react-redux";

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
        logIn: PropTypes.func.isRequired
    }

    authenticate = event => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!email || !password) {
            return ;
        }

        this.props.logIn(email, password);
    }

    render() {
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
                            error={this.props.hasError}
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
                            error={this.props.hasError}
                        />
                        <SubmitButton data-testid="LoginForm-SubmitButton">Войти</SubmitButton>
                    </form>
                    <RegistrationLink />
                </LoginFormContainer>
            </LoginFormPaper>
        );
    }
}

const mapStateToProps = state => ({
    hasError: !!getLoginError(state)
});

const mapDispatchToProps = {
    logIn: (email, password) => authRequest({ email, password })
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
