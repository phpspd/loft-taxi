import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import { authRequest, authSuccess, authFailure, registrationRequest, registrationFailure, registrationSuccess } from "./actions";
import { serverAuth, serverRegister } from "../../api";
import { getRequest as getProfile } from "../profile";
import { addressListRequest } from "../route/actions";

export function* authorizationSaga({ payload }) {
    const { email, password } = payload;
    try {
        const { success, token, error } = yield call(serverAuth, email, password);
        if (success) {
            yield put(authSuccess(token));
        } else {
            yield put(authFailure(error));
        }
    } catch(error) {
        yield put(authFailure(error));
    }
};

export function* registrationSaga({ payload }) {
    const { email, password, surname, name } = payload;
    try {
        const { success, token, error } = yield call(serverRegister, email, password, surname, name);
        if (success) {
            yield put(registrationSuccess(token));
        } else {
            yield put(registrationFailure(error));
        }
    } catch(error) {
        yield put(registrationFailure(error));
    }
};

export function* handleSuccessSaga({ payload: token }) {
    yield put(getProfile({ token }));
    yield put(addressListRequest());
}

export default function* userRootSaga() {
    yield takeEvery(authRequest, authorizationSaga);
    yield takeEvery(registrationRequest, registrationSaga);
    yield takeLatest([authSuccess, registrationSuccess], handleSuccessSaga);
}
