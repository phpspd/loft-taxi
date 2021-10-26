import { serverGetCard, serverSaveCard } from "../../api";
import { getRequest, getSuccess, getFailure, saveFailure, saveRequest, saveSuccess } from "./actions";

export const profileMiddleware = store => next => action => {
    if (action.type === getRequest.toString()) {
        const { token } = action.payload;
        serverGetCard(token)
            .then(({ cardName, cardNumber, expiryDate, cvc, error }) => {
                if (error) {
                    store.dispatch(getFailure(error));
                } else {
                    store.dispatch(getSuccess({ cardHolder: cardName, cardNumber, expiryDate, cvc }));
                }
            }).catch(error => {
                store.dispatch(getFailure(error));
            });
    } else if (action.type === saveRequest.toString()) {
        const { cardHolder, cardNumber, expiryDate, cvc, token } = action.payload;
        serverSaveCard(cardHolder, cardNumber, expiryDate, cvc, token)
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
