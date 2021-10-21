import { getRequest, getSuccess, getFailure, saveFailure, saveRequest, saveSuccess } from "./actions";

export const getRequestMiddleware = store => next => action => {
    if (action.type === getRequest.toString()) {
        const { token } = action.payload;
        fetch("https://loft-taxi.glitch.me/card?token=" + token)
            .then(response => response.json())
            .then(({ cardName, cardNumber, expiryDate, cvc, error }) => {
                if (error) {
                    store.dispatch(getFailure(error));
                } else {
                    store.dispatch(getSuccess({ cardHolder: cardName, cardNumber, expiryDate, cvc }));
                }
            }).catch(error => {
                store.dispatch(getFailure(error));
            });
    }

    return next(action);
};

export const saveRequestMiddleware = store => next => action => {
    if (action.type === saveRequest.toString()) {
        const { cardHolder, cardNumber, expiryDate, cvc, token } = action.payload;
        fetch("https://loft-taxi.glitch.me/card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cardName: cardHolder,
                cardNumber,
                expiryDate,
                cvc,
                token
            })
        })
            .then(response => response.json())
            .then(({ success, error }) => {
                if (success) {
                    store.dispatch(saveSuccess({ cardHolder, cardNumber, expiryDate, cvc }));
                } else {
                    store.dispatch(saveFailure(error));
                }
            }).catch(error => {
                store.dispatch(saveFailure(error));
            });
    }

    return next(action);
};