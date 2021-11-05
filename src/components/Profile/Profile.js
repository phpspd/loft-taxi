import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";
import { Row, RowSpacer, Input, Button } from "../form";

import { ReactComponent as ChipIcon } from "./resources/ChipIcon.svg";
import { ReactComponent as CardLogo } from "./resources/CardLogo.svg";

import "./Profile.css";
import { connect } from "react-redux";
import { clearIsSaved, getCardHolder, getCardNumber, getCvc, getExpiryDate, getIsSaved, saveRequest, saveFailure, getSaveError } from "../../modules/profile";
import { getToken } from "../../modules/user";
import { Link } from "react-router-dom";

const normalizeCardHolder = value => {
    return value.toUpperCase();
};

const normalizeCardNumber = value => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    let result = "";
    for (let group = 0; group < 4; ++group) {
        result += onlyNums.substr(group * 4, 4);
        if (onlyNums.length > group * 4) {
            result += " ";
        }
    }
    return result.trim();
};

const normalizeExpiryDate = value => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length >= 2) {
        return onlyNums.substr(0, 2) + "/" + onlyNums.substr(2, 2);
    }
    return onlyNums.substr(0, 2);
};

const normalizeCvc = value => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    
    return onlyNums.substr(0, 3);
};

const profileFormValidator = values => {
    const errors = {};

    if (!(values.cardHolder || "").trim()) {
        errors.cardHolder = "required";
    }

    if (!values.cardNumber) {
        errors.cardNumber = "required";
    } else if (values.cardNumber.length < 19) {
        errors.cardNumber = "should be 16 digitals length";
    }

    if (!values.expiryDate) {
        errors.expiryDate = "required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiryDate)) {
        errors.expiryDate = "invalid date format";
    }

    if (!values.cvc) {
        errors.cvc = "required";
    }

    return errors;
};

class Profile extends React.Component {
    componentDidMount() {
        const { isSaved } = this.props;
        if (isSaved) {
            this.props.clearIsSaved();
        }
    }

    onSubmit = ({ cardHolder, cardNumber, expiryDate, cvc }) => {
        try {
            this.props.save(
                cardHolder,
                cardNumber,
                convertExpiryDateToDate(expiryDate),
                cvc,
                this.props.token
            );
        } catch(error) {
            this.props.saveFailure(error);
        }
    }

    render() {
        return (
            <section className="Profile">
                <div className="pointer-events">
                    <div className="shadow" />
                    <Paper className="form-paper" elevation={1} square>
                        <Typography variant="h4" align="center">Профиль</Typography>
                        {
                            this.props.isSaved
                                ? this.renderSuccessForm()
                                : this.renderForm()
                        }
                    </Paper>
                </div>
            </section>
        )
    }

    renderForm() {
        return (
            <>
                <Typography variant="body1" align="center">Введите платежные данные</Typography>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} data-testid="Profile-form">
                    <div className="form-container">
                        <div className="left">
                                <Input
                                    className="margin-bottom full-width"
                                    label="Имя владельца"
                                    name="cardHolder"
                                    fullWidth
                                    required
                                    normalize={normalizeCardHolder}
                                />
                                <Input
                                    className="margin-bottom full-width"
                                    label="Номер карты"
                                    name="cardNumber"
                                    fullWidth
                                    required
                                    maxLength="19"
                                    onChange={this.onCardNumberChange}
                                    normalize={normalizeCardNumber}
                                />
                                <Row className="full-width">
                                    <Input
                                        className="margin-right"
                                        label="MM/YY"
                                        name="expiryDate"
                                        fullWidth
                                        required
                                        onChange={this.onExpiryDateChange}
                                        normalize={normalizeExpiryDate}
                                    />
                                    <RowSpacer />
                                    <Input
                                        label="CVC"
                                        name="cvc"
                                        fullWidth
                                        required
                                        maxLength="3"
                                        onChange={this.onCvcChange}
                                        normalize={normalizeCvc}
                                    />
                                </Row>
                        </div>
                        <div className="right">
                            <Paper className="card" elevation={5}>
                                <div className="card-header">
                                    <CardLogo />
                                    <Typography variant="body1">{this.expiryDate}</Typography>
                                </div>
                                <div>
                                    <Field
                                        name="cardNumber"
                                        component={({ input: { value }}) => (
                                            <Typography className="card-number" variant="body1" data-testid="placeCardNumber">{value || "0000 0000 0000 0000"}</Typography>
                                        )}
                                    />
                                </div>
                                <div className="card-bottom">
                                    <ChipIcon />
                                    <div className="mc-icon" />
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <div className="button-container">
                        <Button className="btn" variant="contained" disableElevation color="primary" type="submit">Сохранить</Button>
                    </div>
                </form>
            </>
        )
    }

    renderSuccessForm() {
        return (
            <>
                <Typography variant="body1" align="center">Платёжные данные обновлены. Теперь вы можете заказывать такси.</Typography>
                <div className="button-container margin-top">
                    <Link
                        to="/map"
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained btn MuiButton-containedPrimary MuiButton-disableElevation"
                    >
                        Перейти на карту
                    </Link>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    initialValues: {
        cardHolder: getCardHolder(state),
        cardNumber: getCardNumber(state),
        expiryDate: convertDateToExpiryDate(getExpiryDate(state)),
        cvc: getCvc(state),
    },
    token: getToken(state),
    isSaved: getIsSaved(state),
    saveError: getSaveError(state)
});

function convertExpiryDateToDate(expStr) {
    const expAry = expStr.split("/");
    const date = new Date("20" + ("0" + expAry[1]).substr(-2), +expAry[0] - 1);
    return date.toISOString();
}

function convertDateToExpiryDate(dateStr) {
    if (!dateStr) {
        return "";
    }
    const date = new Date(dateStr);
    return [("0" + (date.getMonth() + 1)).substr(-2), "/", ("0" + date.getFullYear()).substr(-2)].join("");
}

const mapDispatchToProps = {
    save: (cardHolder, cardNumber, expiryDate, cvc, token) => saveRequest({ cardHolder, cardNumber, expiryDate, cvc, token }),
    saveFailure,
    clearIsSaved
};

const WrappedProfile = reduxForm({
    form: "profileForm",
    validate: profileFormValidator
})(Profile);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedProfile);
