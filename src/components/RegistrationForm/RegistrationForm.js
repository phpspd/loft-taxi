import React from "react";
import PropTypes from "prop-types";

import { Input, Row, RowSpacer } from "../form";
import { LoginLink } from "./components";

import "./RegistrationForm.css";
import { Container, Paper, withStyles, Typography } from "@material-ui/core";
import { Button } from "../form";
import { connect } from "react-redux";
import { registrationRequest, getRegistrationError } from "../../modules/user";
import { reduxForm } from "redux-form";
import formValidator from "./utils/validator";

const RegistrationFormPaper = withStyles({
    root: {
        width: "520px",
        padding: "48px 0",
        borderRadius: "20px"
    }
})(Paper);

const RegistrationFormContainer = withStyles({
    root: {
        display: "flex",
        padding: "0 102px 0 98px",
        alignItems: "center",
        flexDirection: "column"
    }
})(Container);

export class RegistrationForm extends React.Component {
    static propTypes = {
        register: PropTypes.func.isRequired
    }

    register = ({ email, lastName, firstName, password }) => {
        this.props.register(email, password, lastName, firstName);
    }

    render() {
        return (
            <RegistrationFormPaper className="RegistrationForm" elevation={5}>
                <RegistrationFormContainer maxWidth="lg">
                    <Typography variant="h4">Регистрация</Typography>
                    <form onSubmit={this.props.handleSubmit(this.register)} data-testid="RegistrationForm-form">
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Адрес электронной почты"
                            name="email"
                        />
                        <Row>
                            <Input
                                margin="normal"
                                required
                                fullWidth
                                label="Имя"
                                name="firstName"
                            />
                            <RowSpacer />
                            <Input
                                margin="normal"
                                required
                                fullWidth
                                label="Фамилия"
                                name="lastName"
                            />
                        </Row>
                        <Input
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                        />

                        <Button style={{marginTop: "8px"}} data-testid="RegistrationForm-SubmitButton" type="submit">Зарегистрироваться</Button>
                    </form>
                    <LoginLink />
                </RegistrationFormContainer>
            </RegistrationFormPaper>
        );
    }
}

const mapStateToProps = state => ({
    hasError: !!getRegistrationError(state)
});

const mapDispatchToProps = {
    register: (email, password, surname, name) => registrationRequest({ email, password, surname, name })
};

const WrappedRegistrationForm = reduxForm({
    form: "loginForm",
    validate: formValidator
})(RegistrationForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedRegistrationForm);
