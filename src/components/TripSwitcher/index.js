import { Button, CardMedia, Container, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";

class TripSwitcher extends React.Component {

    render() {
        return <section>
            <Container>
                <Paper elevation="1">
                    <Container>
                        <TextField
                        />
                        <TextField
                        />
                    </Container>
                </Paper>
                <Paper elevation="5">
                    <div>
                        {rates.map((rate, index) => (
                            <Paper key={index} elevation="3" onClick={() => this.switchRate(index)}>
                                <Typography variant="body1">{rate.caption}</Typography>
                                <Typography variant="caption">Стоимость</Typography>
                                <Typography variant="h6">{rate.price}</Typography>
                                <CardMedia src={rate.img} />
                            </Paper>
                        ))}
                    </div>
                    <Button variant="contained" onClick={this.order}>Заказать</Button>
                </Paper>
            </Container>
        </section>
    }
}