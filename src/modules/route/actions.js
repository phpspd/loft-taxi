import { createAction } from "redux-actions";

export const addressListRequest = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST");
export const addressListRequestSuccess = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST_SUCCESS");
export const addressListRequestFailure = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST_FAILURE");
export const getRouteRequest = createAction("loft-taxi/route/GET_ROUTE_REQUEST");
export const getRouteRequestSuccess = createAction("loft-taxi/route/GET_ROUTE_REQUEST_SUCCESS");
export const getRouteRequestFailure = createAction("loft-taxi/route/GET_ROUTE_REQUEST_FAILURE");
export const clearRoute = createAction("loft-taxi/route/CLEAR_ROUTE");
