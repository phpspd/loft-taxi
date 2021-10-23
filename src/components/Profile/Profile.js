import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import FlexRow, { FlexRowSpacer } from "../form/FlexRow/FlexRow";

import { ReactComponent as ChipIcon } from "./resources/ChipIcon.svg";
import { ReactComponent as CardLogo } from "./resources/CardLogo.svg";

import "./Profile.css";
import { connect } from "react-redux";
import { clearIsSaved, getCardHolder, getCardNumber, getCvc, getExpiryDate, getIsSaved, saveRequest } from "../../modules/profile";
import { getToken } from "../../modules/user";
import { Link } from "react-router-dom";

export class Profile extends React.Component {
    state = {
        cardHolder: this.props.cardHolder || "",
        cardNumber: this.props.cardNumber || "",
        expiryDate: this.props.expiryDate || "",
        cvc: this.props.cvc || ""
    }

    componentDidMount() {
        const { isSaved } = this.props;
        if (isSaved) {
            this.props.clearIsSaved();
        }
    }

    onCardHolderChange = (e) => {
        this.setState({
            cardHolder: e.target.value.toUpperCase()
        });
    }

    onCardNumberChange = (e) => {
        const value = e.target.value;

        if (/[^\d ]/.test(value)) {
            return;
        }

        const formattedValue = value.split("").reduce(
            (acc, sym) => 
                acc + (
                    sym === " "
                    ? ""
                    : (
                        acc.length % 5 === 4
                        ? " "
                        : ""
                    ) + sym
                ), ""
        )
        
        this.setState({
            cardNumber: formattedValue.substr(0, 19)
        });
    }

    onExpiryDateChange = (e) => {
        let value = e.target.value;
        
        value = value.replace(/\D/g, "");
        
        const formattedValue = value.substr(0, 2) + (value.length > 2 ? "/" : "") + value.substr(2, 2);

        this.setState({
            expiryDate: formattedValue.substr(0, 5)
        });
    }

    onCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").substr(0, 3);

        this.setState({
            cvc: value
        });
    }

    submit = (e) => {
        e.preventDefault();
        this.props.save(
            this.state.cardHolder,
            this.state.cardNumber,
            convertExpiryDateToDate(this.state.expiryDate),
            this.state.cvc,
            this.props.token,
        );
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
                <form onSubmit={this.submit} data-testid="Profile-form">
                    <div className="form-container">
                        <div className="left">
                                <TextField
                                    className="margin-bottom full-width"
                                    label="Имя владельца"
                                    name="cardHolder"
                                    fullWidth
                                    required
                                    onChange={this.onCardHolderChange}
                                    value={this.state.cardHolder}
                                    inputProps={{"data-testid": "cardHolder"}}
                                ></TextField>
                                <TextField
                                    className="margin-bottom full-width"
                                    label="Номер карты"
                                    name="cardNumber"
                                    fullWidth
                                    required
                                    maxLength="19"
                                    onChange={this.onCardNumberChange}
                                    value={this.state.cardNumber}
                                    inputProps={{"data-testid": "cardNumber"}}
                                ></TextField>
                                <FlexRow className="full-width">
                                    <TextField
                                        className="margin-right"
                                        label="MM/YY"
                                        name="expiryDate"
                                        fullWidth
                                        required
                                        onChange={this.onExpiryDateChange}
                                        value={this.state.expiryDate}
                                        inputProps={{"data-testid": "expiryDate"}}
                                    ></TextField>
                                    <FlexRowSpacer />
                                    <TextField
                                        className="TextField"
                                        label="CVC"
                                        name="cvc"
                                        fullWidth
                                        required
                                        maxLength="3"
                                        onChange={this.onCvcChange}
                                        value={this.state.cvc}
                                        inputProps={{"data-testid": "cvc"}}
                                    ></TextField>
                                </FlexRow>
                        </div>
                        <div className="right">
                            <Paper className="card" elevation={5}>
                                <div className="card-header">
                                    <CardLogo />
                                    <Typography variant="body1">{this.expiryDate}</Typography>
                                </div>
                                <div>
                                    <Typography className="card-number" variant="body1" data-testid="placeCardNumber">{this.state.cardNumber || "0000 0000 0000 0000"}</Typography>
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
    cardHolder: getCardHolder(state),
    cardNumber: getCardNumber(state),
    expiryDate: convertDateToExpiryDate(getExpiryDate(state)),
    cvc: getCvc(state),
    token: getToken(state),
    isSaved: getIsSaved(state)
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
    clearIsSaved
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
