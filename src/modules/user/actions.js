import { createAction } from "redux-actions";

export const authRequest = createAction("loft-taxi/user/AUTH_REQUEST");
export const authSuccess = createAction("loft-taxi/user/AUTH_SUCCESS");
export const authFailure = createAction("loft-taxi/user/AUTH_FAILURE");
export const authLogOut = createAction("loft-taxi/user/AUTH_LOG_OUT");

export const registrationRequest = createAction("loft-taxi/user/REGISTRATION_REQUEST");
export const registrationSuccess = createAction("loft-taxi/user/REGISTRATION_SUCCESS");
export const registrationFailure = createAction("loft-taxi/user/REGISTRATION_FAILURE");
