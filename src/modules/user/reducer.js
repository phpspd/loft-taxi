import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
    authRequest,
    authSuccess,
    authFailure,
    authLogOut,
    registrationFailure,
    registrationRequest,
    registrationSuccess
} from "./actions";

const isLoggedIn = handleActions(
    {
        [authRequest]: () => false,
        [authSuccess]: () => true,
        [authLogOut]: () => false,
        [registrationRequest]: () => false,
        [registrationSuccess]: () => true
    },
    false
);

const token = handleActions(
    {
        [authRequest]: () => null,
        [authSuccess]: (_state, action) => action.payload || null,
        [authLogOut]: () => null,
        [registrationRequest]: () => null,
        [registrationSuccess]: (_state, action) => action.payload || null
    },
    null
);

const isProcessing = handleActions(
    {
        [authRequest]: () => true,
        [authSuccess]: () => false,
        [authFailure]: () => false,
        [registrationRequest]: () => true,
        [registrationSuccess]: () => false,
        [registrationFailure]: () => false
    },
    false
);

const loginError = handleActions(
    {
        [authRequest]: () => null,
        [authFailure]: (_state, action) => action.payload,
    },
    null
);

const registrationError = handleActions(
    {
        [registrationRequest]: () => null,
        [registrationFailure]: (_state, action) => action.payload,
    },
    null
);

export default combineReducers({
    isLoggedIn,
    token,
    isProcessing,
    loginError,
    registrationError
});
