import { serverAuth, serverRegister } from "../../api";
import { getRequest as getProfile } from "../profile";
import {
    authRequest,
    authSuccess,
    authFailure,
    registrationRequest,
    registrationFailure,
    registrationSuccess
} from "./actions";

export const userMiddleware = store => next => action => {
    if (action.type === authRequest.toString()) {
        const { email, password } = action.payload;
        serverAuth(email, password)
            .then(
                ({ success, token, error }) => {
                    if (success) {
                        store.dispatch(authSuccess(token));
                    } else {
                        store.dispatch(authFailure(error));
                    }
                })
            .catch(error => {
                store.dispatch(authFailure(error));
            });
    } else if (action.type === registrationRequest.toString()) {
        const { email, password, surname, name } = action.payload;
        serverRegister(email, password, surname, name)
            .then(({ success, token, error }) => {
                if (success) {
                    store.dispatch(registrationSuccess(token));
                } else {
                    store.dispatch(registrationFailure(error));
                }
            }).catch(error => {
                store.dispatch(registrationFailure(error));
            })
    } else if ([authSuccess.toString(), registrationSuccess.toString()].includes(action.type)) {
        const token = action.payload;
        store.dispatch(getProfile({ token }));
    }
    return next(action);
};
