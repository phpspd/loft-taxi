import { createAction } from "redux-actions";

export const getRequest = createAction("loft-taxi/profile/GET_REQUEST");
export const getSuccess = createAction("loft-taxi/profile/GET_SUCCESS");
export const getFailure = createAction("loft-taxi/profile/GET_FAILURE");

export const saveRequest = createAction("loft-taxi/profile/SAVE_REQUEST");
export const saveSuccess = createAction("loft-taxi/profile/SAVE_SUCCESS");
export const saveFailure = createAction("loft-taxi/profile/SAVE_FAILURE");
export const clearIsSaved = createAction("loft-taxi/profile/CLEAR_IS_SAVED");
