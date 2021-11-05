import React from "react";
import PropTypes from "prop-types";

import { RegistrationLink } from "./components";
import { Button } from "../form";

import "./LoginForm.css";
import { withStyles, Container, Paper, Typography } from "@material-ui/core";
import { Input } from "../form";

import { authRequest, getLoginError } from "../../modules/user";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import formValidator from "./utils/validator";

const LoginFormPaper = withStyles({
    root: {
        width: "520px",
        padding: "48px 0",
        borderRadius: "20px"
    }
})(Paper);

const LoginFormContainer = withStyles({
    root: {
        display: "flex",
        padding: "0 102px 0 98px",
        alignItems: "center",
        flexDirection: "column"
    }
})(Container);

export class LoginForm extends React.Component {
    static propTypes = {
        logIn: PropTypes.func.isRequired
    }

    authenticate = ({ email, password }) => {
        this.props.logIn(email, password);
    }

    render() {
        return (
            <LoginFormPaper className="LoginForm" elevation={5}>
                <LoginFormContainer maxWidth="lg">
                    <Typography variant="h4">Войти</Typography>
                    <form onSubmit={this.props.handleSubmit(this.authenticate)} data-testid="LoginForm-form">
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Имя пользователя"
                            name="email"
                            placeholder="email@example.com"
                        />
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                            placeholder="*********"
                        />
                        <Button style={{marginTop: "80px"}} type="submit" data-testid="LoginForm-SubmitButton">Войти</Button>
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

const WrappedLoginForm = reduxForm({
    form: "loginForm",
    validate: formValidator
})(LoginForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLoginForm);
