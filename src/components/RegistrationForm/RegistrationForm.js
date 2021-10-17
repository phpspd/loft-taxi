import React from "react";
import PropTypes from "prop-types";

import { FlexRow, FlexRowSpacer } from "../form/FlexRow/FlexRow";
import LoginLink from "./LoginLink/LoginLink";

import "./RegistrationForm.css";
import { Container, Paper, styled, TextField, Typography } from "@material-ui/core";
import SubmitButton from "../SubmitButton/SubmitButton";
import { withAuth } from "../../contexts/AuthContext/AuthContext";
import { withNavigation } from "../../contexts/NavigationContext/NavigationContext";

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
        isLoggedIn: PropTypes.bool,
        navigateTo: PropTypes.func.isRequired,
        logIn: PropTypes.func
    }

    componentDidUpdate() {
        if (this.props.isLoggedIn) {
            this.props.navigateTo("Map");
        }
    }

    register = event => {
        event.preventDefault();

        const email = event.target.email.value;
        const lastName = event.target.lastName.value;
        const firstName = event.target.firstName.value;
        const password = event.target.password.value;

        if (!email || !lastName || !firstName || !password || typeof this.props.logIn !== "function") {
            return ;
        }

        this.props.logIn(email, password);
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
                        />
                        <FlexRow>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Имя"
                                name="firstName"
                            />
                            <FlexRowSpacer />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Фамилия"
                                name="lastName"
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
                    <LoginLink />
                </RegistrationFormContainer>
            </RegistrationFormPaper>
        );
    }
}

export default withNavigation(withAuth(RegistrationForm));
