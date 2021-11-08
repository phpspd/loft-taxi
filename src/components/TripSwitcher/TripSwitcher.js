import { Box, CardMedia, Container, FormControl, MenuItem, Paper, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled, withStyles } from "@material-ui/styles";
import { getIsCardFilled } from "../../modules/profile";
import { getAddressList, getRouteRequest, clearRoute, getRoutePoints } from "../../modules/route";
import { Button, Select } from "../form";
import PropTypes from "prop-types";
import { reduxForm, getFormValues } from "redux-form";

const rates = [
    {
        caption: "Стандарт",
        price: "150Р",
        img: "standart.jpg"
    },
    {
        caption: "Бизнес",
        price: "250Р",
        img: "biznes.jpg"
    },
    {
        caption: "Премиум",
        price: "350Р",
        img: "premium.png"
    }
];

const ComponentWrapper = styled("section")({
    height: "calc(100vh - 73px)",
    position: "relative",
    pointerEvents: "none"
});

const ComponentContainer = withStyles({
    root: {
        padding: "24px",
        position: "absolute"
    }
})(Container);

const FormPaper = withStyles({
    root: {
        width: "486px",
        padding: "16px 0",
        borderRadius: "10px",
        paddingBottom: "38px",
        pointerEvents: "all"
    }
})(Paper);

const FormContainer = withStyles({
    root: {
        padding: "0 20px"
    }
})(Container);

const StyledFormControl = withStyles({
    root: {
        position: "relative",
        minWidth: "100%",
        "&:first-child": {
            marginBottom: "14px"
        }
    }
})(FormControl);

const BottomPaper = withStyles({
    root: {
        top: "172px",
        left: "24px",
        padding: "32px 46px",
        position: "absolute",
        maxWidth: "486px",
        boxSizing: "border-box",
        borderRadius: "10px",
        pointerEvents: "all"
    }
})(Paper);

const RatesContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between"
});

const RatePaper = withStyles({
    root: {
        width: "118px",
        cursor: "pointer",
        height: "167px",
        opacity: "0.6",
        padding: "12px",
        boxSizing: "border-box",
        transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
        marginRight: "20px",
        borderRadius: "10px",
        "&:last-child": {
            marginRight: 0
        },
        "&.active": {
            opacity: 1,
            boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)"
        }
    }
})(Paper);

const RatePriceCaption = withStyles({
    root: {
        color: "#828282",
        fontSize: "11px",
        lineHeight: "11px"
    }
})(Typography);

const RatePriceValue = withStyles({
    root: {
        lineHeight: 1
    }
})(Typography);

const RateCardMedia = withStyles({
    root: {
        width: "95px",
        height: "72px",
        marginTop: "12px"
    }
})(CardMedia);

const FormButton = withStyles({
    root: {
        marginTop: "30px"
    }
})(Button);

const NotifyContainer = withStyles({
    root: {
        padding: "0 20px"
    }
})(Container);

const StyledBox = withStyles({
    root: {
        padding: "0 24px",
        textAlign: "left"
    }
})(Box);

const NotifyHeader = withStyles({
    root: {
        fontWeight: 700,
        marginBottom: "16px"
    }
})(Typography);

class TripSwitcher extends React.Component {
    static propTypes = {
        isCardFilled: PropTypes.bool.isRequired,
        addressList: PropTypes.array.isRequired,
        getRouteRequest: PropTypes.func.isRequired,
        clearRoute: PropTypes.func.isRequired
    }

    state = {
        rateIndex: 0
    };

    switchRate = index => {
        this.setState({
            rateIndex: index
        });
    }

    order = ({ from, to }) => {
        this.props.getRouteRequest({ from, to });
    }

    clearRoute = () => {
        this.props.clearRoute();
        this.props.reset();
        this.setState({
            rateIndex: 0
        });
    }

    render() {
        if (this.props.orderDone) {
            return <ComponentWrapper>
                <ComponentContainer>
                    <FormPaper elevation={1}>
                        <NotifyContainer>
                            <StyledBox>
                                <NotifyHeader variant="h4" align="left">Заказ размещен</NotifyHeader>
                                <Typography variant="body1" align="left">Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</Typography>
                                <FormButton variant="contained" onClick={this.clearRoute} color="primary" fullWidth data-testid="TripSwitcher-clear-btn">Сделать новый заказ</FormButton>
                            </StyledBox>
                        </NotifyContainer>
                    </FormPaper>
                </ComponentContainer>
            </ComponentWrapper>
        }
        if (this.props.isCardFilled) {
            return <ComponentWrapper>
                <ComponentContainer>
                    <form onSubmit={this.props.handleSubmit(this.order)}>
                        <FormPaper elevation={1}>
                            <FormContainer>
                                <StyledFormControl>
                                    <Select
                                        id="select-from"
                                        name="from"
                                        label="Откуда"
                                        autoWidth
                                        value={this.props.from || ""}
                                        inputProps={{"data-testid": "select-from"}}
                                    >
                                    {
                                        this.props.addressList
                                            .filter(val => val !== this.props.to)
                                            .map((val) => (
                                                <MenuItem key={val} value={val}>{val}</MenuItem>
                                            ))
                                    }
                                    </Select>
                                </StyledFormControl>
                                <StyledFormControl>
                                    <Select
                                        id="select-to"
                                        name="to"
                                        label="Куда"
                                        autoWidth
                                        value={this.props.to || ""}
                                        inputProps={{"data-testid": "select-to"}}
                                    >
                                    {
                                        this.props.addressList
                                            .filter(val => val !== this.props.from)
                                            .map((val) => (
                                                <MenuItem key={val} value={val}>{val}</MenuItem>
                                            ))
                                    }
                                    </Select>
                                </StyledFormControl>
                            </FormContainer>
                        </FormPaper>
                        <BottomPaper elevation={5}>
                            <RatesContainer>
                                {rates.map((rate, index) => (
                                    <RatePaper
                                        className={this.state.rateIndex === index ? "active" : undefined}
                                        key={index}
                                        elevation={3}
                                        onClick={() => this.switchRate(index)}
                                        data-testid={`rate-${index}`}
                                    >
                                        <Typography variant="body1">{rate.caption}</Typography>
                                        <RatePriceCaption variant="caption">Стоимость</RatePriceCaption>
                                        <RatePriceValue variant="h6">{rate.price}</RatePriceValue>
                                        <RateCardMedia image={`/static/media/${rate.img}`} />
                                    </RatePaper>
                                ))}
                            </RatesContainer>
                            <FormButton variant="contained" color="primary" fullWidth data-testid="TripSwitcher-submit" type="submit">Заказать</FormButton>
                        </BottomPaper>
                    </form>
                </ComponentContainer>
            </ComponentWrapper>
        }
        return <ComponentWrapper>
            <ComponentContainer>
                <FormPaper elevation={1}>
                    <NotifyContainer>
                        <StyledBox>
                            <NotifyHeader variant="h4" align="left">Платежные данные не заполнены</NotifyHeader>
                            <Typography variant="body1" align="left">Пожалуйста, перейдите в профиль и заполните.</Typography>
                            <FormButton to="/profile" component={Link} variant="contained" color="primary">Перейти</FormButton>
                        </StyledBox>
                    </NotifyContainer>
                </FormPaper>
            </ComponentContainer>
        </ComponentWrapper>
    }
}

const mapStateToProps = state => ({
    isCardFilled: getIsCardFilled(state),
    addressList: getAddressList(state),
    orderDone: !!getRoutePoints(state),
    from: (getFormValues("tripSwitcher")(state) || {}).from,
    to: (getFormValues("tripSwitcher")(state) || {}).to
});

const mapDispatchToProps = {
    getRouteRequest,
    clearRoute
};

const formValidator = ({ from, to }) => {
    const errors = {};
    if (!from) {
        errors.from = "required";
    }

    if (!to) {
        errors.to = "required";
    }

    return errors;
};

const WrappedTripSwitcher = reduxForm({
    form: "tripSwitcher",
    validate: formValidator
})(TripSwitcher);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedTripSwitcher);
