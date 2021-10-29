import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
    addressListRequest,
    addressListRequestSuccess,
    addressListRequestFailure,
    getRouteRequest,
    getRouteRequestFailure,
    getRouteRequestSuccess,
    clearRoute
} from "./actions";

const isLoading = handleActions(
    {
        [addressListRequest]: () => true,
        [addressListRequestSuccess]: () => false,
        [addressListRequestFailure]: () => false
    },
    false
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

const routeIsLoading = handleActions(
    {
        [getRouteRequest]: () => true,
        [getRouteRequestSuccess]: () => false,
        [getRouteRequestFailure]: () => false
    },
    false
);

const routePoints = handleActions(
    {
        [getRouteRequest]: () => null,
        [getRouteRequestSuccess]: (_state, action) => action.payload,
        [clearRoute]: () => null
    },
    null
);

export default combineReducers({
    isLoading,
    addressList,
    addressListError,
    routeIsLoading,
    routePoints
});
