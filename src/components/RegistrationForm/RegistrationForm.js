import React from "react";
import PropTypes from "prop-types";

import { FlexRow, FlexRowSpacer } from "../form/FlexRow/FlexRow";
import LoginLink from "./LoginLink/LoginLink";

import "./RegistrationForm.css";
import { Container, Paper, styled, TextField, Typography } from "@material-ui/core";
import SubmitButton from "../SubmitButton/SubmitButton";
import { connect } from "react-redux";
import { registrationRequest, getRegistrationError } from "../../modules/user";

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

export class RegistrationForm extends React.Component {
    static propTypes = {
        register: PropTypes.func.isRequired
    }

    register = event => {
        event.preventDefault();

        const email = event.target.email.value;
        const lastName = event.target.lastName.value;
        const firstName = event.target.firstName.value;
        const password = event.target.password.value;

        if (!email || !lastName || !firstName || !password) {
            return ;
        }

        this.props.register(email, password, firstName, lastName);
    }

    render() {
        return (
            <RegistrationFormPaper className="RegistrationForm" elevation={5}>
                <RegistrationFormContainer maxWidth="lg">
                    <Typography variant="h4">Регистрация</Typography>
                    <form onSubmit={this.register} data-testid="RegistrationForm-form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            label="Адрес электронной почты"
                            name="email"
                            error={this.props.hasError}
                        />
                        <FlexRow>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Имя"
                                name="firstName"
                                error={this.props.hasError}
                            />
                            <FlexRowSpacer />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Фамилия"
                                name="lastName"
                                error={this.props.hasError}
                            />
                        </FlexRow>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Пароль"
                            name="password"
                            error={this.props.hasError}
                        />

                        <SubmitButton data-testid="RegistrationForm-SubmitButton">Зарегистрироваться</SubmitButton>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);
