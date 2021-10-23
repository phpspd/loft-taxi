import { getRequest as getProfile } from "../profile";
import {
    authRequest,
    authSuccess,
    authFailure,
    registrationRequest,
    registrationFailure,
    registrationSuccess
} from "./actions";

export const authRequestMiddleware = store => next => action => {
    if (action.type === authRequest.toString()) {
        const { email, password } = action.payload;
        fetch("https://loft-taxi.glitch.me/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(({ success, token, error }) => {
            if (success) {
                store.dispatch(authSuccess(token));
            } else {
                store.dispatch(authFailure(error));
            }
        }).catch(error => {
            store.dispatch(authFailure(error));
        });
    } else if ([authSuccess.toString(), registrationSuccess.toString()].includes(action.type)) {
        const token = action.payload;
        store.dispatch(getProfile({ token }));
    } else {
        return next(action);
    }
};

export const registrationRequestMiddleware = store => next => action => {
    if (action.type === registrationRequest.toString()) {
        const { email, password, name, surname } = action.payload;
        fetch("https://loft-taxi.glitch.me/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                name,
                surname
            })
        })
        .then(response => response.json())
        .then(({ success, token, error }) => {
            if (success) {
                store.dispatch(registrationSuccess(token));
            } else {
                store.dispatch(registrationFailure(error));
            }
        }).catch(error => {
            store.dispatch(registrationFailure(error));
        });
    } else {
        return next(action);
    }
}
