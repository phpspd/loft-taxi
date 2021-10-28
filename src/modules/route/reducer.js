import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
    addressListRequest,
    addressListRequestSuccess,
    addressListRequestFailure
} from "./actions";

const isLoading = handleActions(
    {
        [addressListRequest]: () => true,
        [addressListRequestSuccess]: () => false,
        [addressListRequestFailure]: () => false
    },
    ""
);

const addressList = handleActions(
    {
        [addressListRequest]: () => [],
        [addressListRequestSuccess]: (_state, action) => action.payload
    },
    []
);

const addressListError = handleActions(
    {
        [addressListRequest]: () => null,
        [addressListRequestFailure]: (_state, action) => action.payload,
    },
    null
);

export default combineReducers({
    isLoading,
    addressList,
    addressListError
});
