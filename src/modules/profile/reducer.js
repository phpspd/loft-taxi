import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
    getRequest,
    getFailure,
    getSuccess,
    saveRequest,
    saveSuccess,
    saveFailure,
    clearIsSaved
} from "./actions";

const isLoading = handleActions(
    {
        [getRequest]: () => true,
        [getSuccess]: () => false,
        [getFailure]: () => false,
        [saveRequest]: () => true,
        [saveSuccess]: () => false,
        [saveFailure]: () => false,
    },
    ""
);

const cardHolder = handleActions(
    {
        [getSuccess]: (_state, action) => action.payload.cardHolder,
        [saveSuccess]: (_state, action) => action.payload.cardHolder,
        [getFailure]: () => "",
    },
    ""
);

const cardNumber = handleActions(
    {
        [getSuccess]: (_state, action) => action.payload.cardNumber,
        [saveSuccess]: (_state, action) => action.payload.cardNumber,
        [getFailure]: () => "",
    },
    ""
);

const expiryDate = handleActions(
    {
        [getSuccess]: (_state, action) => action.payload.expiryDate,
        [saveSuccess]: (_state, action) => action.payload.expiryDate,
        [getFailure]: () => "",
    },
    ""
);

const cvc = handleActions(
    {
        [getSuccess]: (_state, action) => action.payload.cvc,
        [saveSuccess]: (_state, action) => action.payload.cvc,
        [getFailure]: () => "",
    },
    ""
);

const getError = handleActions(
    {
        [getFailure]: (_state, action) => action.payload,
    },
    null
);

const saveError = handleActions(
    {
        [saveFailure]: (_state, action) => action.payload,
        [saveRequest]: () => null,
        [getRequest]: () => null,
    },
    null
);

const isSaved = handleActions(
    {
        [saveRequest]: () => false,
        [clearIsSaved]: () => false,
        [saveSuccess]: () => true,
    },
    false
);

export default combineReducers({
    isLoading,
    cardHolder,
    cardNumber,
    expiryDate,
    cvc,
    getError,
    saveError,
    isSaved
});
