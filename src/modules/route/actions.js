import { createAction } from "redux-actions";

export const addressListRequest = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST");
export const addressListRequestSuccess = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST_SUCCESS");
export const addressListRequestFailure = createAction("loft-taxi/route/ADDRESS_LIST_REQUEST_FAILURE");

