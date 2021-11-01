import { Box, Button, CardMedia, Container, FormControl, InputLabel, MenuItem, Paper, Select, SvgIcon, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { getIsCardFilled } from "../../modules/profile";
import { getAddressList, getRouteRequest, clearRoute, getRoutePoints } from "../../modules/route";
import PropTypes from "prop-types";

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

const ComponentContainer = styled(Container)({
    padding: "24px",
    position: "absolute"
});

const FormPaper = styled(Paper)({
    width: "486px",
    padding: "16px 0",
    borderRadius: "10px",
    paddingBottom: "34px",
    pointerEvents: "all",
    "&.cardNotFilled": {
        padding: "30px"
    }
});

const FormContainer = styled(Container)({
    padding: "0 20px"
});

const StyledFormControl = styled(FormControl)({
    position: "relative",
    minWidth: "100%",
    "&:first-child": {
        marginBottom: "8px"
    }
});

const BottomPaper = styled(Paper)({
    top: "164px",
    left: "24px",
    padding: "32px 46px",
    position: "absolute",
    maxWidth: "486px",
    boxSizing: "border-box",
    borderRadius: "10px",
    pointerEvents: "all"
});

const RatesContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between"
});

const RatePaper = styled(Paper)({
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
});

const RatePriceCaption = styled(Typography)({
    color: "#828282",
    fontSize: "11px",
    lineHeight: "11px"
});

const RatePriceValue = styled(Typography)({
    lineHeight: 1
});

const RateCardMedia = styled(CardMedia)({
    width: "95px",
    height: "72px",
    marginTop: "12px"
});

const FormButton = styled(Button)({
    marginTop: "30px",
    paddingLeft: "24px",
    paddingRight: "24px",
    fontSize: "1.3rem",
    fontWeight: "400",
    borderRadius: "40px",
    letterSpacing: "0px"
});

const NotifyContainer = styled(Container)({
    padding: "0 20px"
});

const StyledBox = styled(Box)({
    padding: "0 24px",
    textAlign: "left"
});

const NotifyHeader = styled(Typography)({
    fontWeight: 700,
    marginBottom: "16px"
});

const NotifyText = styled(Typography)({

}); //@media?

function ArrowIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </SvgIcon>
    )
}

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

    switchRate = (index) => {
        this.setState({
            rateIndex: index
        });
    }

    changeFrom = ({ target: { value } }) => {
        this.setState({
            from: value
        });
    }

    changeTo = ({ target: { value } }) => {
        this.setState({
            to: value
        });
    }

    order = () => {
        const { from, to } = this.state;
        if (this.state.from && this.state.to) {
            this.props.getRouteRequest({ from, to });
        }
    }

    clearRoute = () => {
        this.props.clearRoute();
        this.setState({
            from: "",
            to: ""
        });
    }

    render() {
        if (!this.props.isCardFilled) {
            return <ComponentWrapper>
                <ComponentContainer>
                    <FormPaper className="cardNotFilled" elevation={1}>
                        <NotifyContainer>
                            <StyledBox>
                                <NotifyHeader variant="h4" align="left">Платежные данные не заполнены</NotifyHeader>
                                <NotifyText variant="body1" align="left">Пожалуйста, перейдите в профиль и заполните.</NotifyText>
                                <FormButton to="/profile" component={Link} variant="contained" color="primary" fullWidth>Перейти</FormButton>
                            </StyledBox>
                        </NotifyContainer>
                    </FormPaper>
                </ComponentContainer>
            </ComponentWrapper>
        }
        if (this.props.orderDone) {
            return <ComponentWrapper>
                <ComponentContainer>
                    <FormPaper className="cardNotFilled" elevation={1}>
                        <NotifyContainer>
                            <StyledBox>
                                <NotifyHeader variant="h4" align="left">Заказ размещен</NotifyHeader>
                                <NotifyText variant="body1" align="left">Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</NotifyText>
                                <FormButton variant="contained" onClick={this.clearRoute} color="primary" fullWidth>Сделать новый заказ</FormButton>
                            </StyledBox>
                        </NotifyContainer>
                    </FormPaper>
                </ComponentContainer>
            </ComponentWrapper>
        }
        return <ComponentWrapper>
            <ComponentContainer>
                <FormPaper elevation={1}>
                    <FormContainer>
                        <StyledFormControl>
                            <InputLabel id="select-from-label">Откуда</InputLabel>
                            <Select
                            labelId="select-from-label"
                            id="select-from"
                            autoWidth
                            IconComponent={ArrowIcon}
                            value={this.state.from || ""}
                            onChange={this.changeFrom}
                            >
                            {
                                this.props.addressList
                                    .filter(val => val !== this.state.to)
                                    .map((val) => (
                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                    ))
                            }
                            </Select>
                        </StyledFormControl>
                        <StyledFormControl>
                            <InputLabel id="select-to-label">Куда</InputLabel>
                            <Select
                            labelId="select-to-label"
                            id="select-to"
                            autoWidth
                            IconComponent={ArrowIcon}
                            value={this.state.to || ""}
                            onChange={this.changeTo}
                            >
                            {
                                this.props.addressList
                                    .filter(val => val !== this.state.from)
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
                            <RatePaper className={this.state.rateIndex === index ? "active" : undefined} key={index} elevation={3} onClick={() => this.switchRate(index)}>
                                <Typography variant="body1">{rate.caption}</Typography>
                                <RatePriceCaption variant="caption">Стоимость</RatePriceCaption>
                                <RatePriceValue variant="h6">{rate.price}</RatePriceValue>
                                <RateCardMedia image={`/static/media/${rate.img}`} />
                            </RatePaper>
                        ))}
                    </RatesContainer>
                    <FormButton variant="contained" onClick={this.order} color="primary" fullWidth>Заказать</FormButton>
                </BottomPaper>
            </ComponentContainer>
        </ComponentWrapper>
    }
}

const mapStateToProps = state => ({
    isCardFilled: getIsCardFilled(state),
    addressList: getAddressList(state),
    orderDone: !!getRoutePoints(state)
});

const mapDispatchToProps = {
    getRouteRequest,
    clearRoute
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripSwitcher);
