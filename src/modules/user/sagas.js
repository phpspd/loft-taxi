import { takeEvery, takeLatest, call, put, fork } from "redux-saga/effects";
import { authRequest, authSuccess, authFailure, registrationRequest, registrationFailure, registrationSuccess } from "./actions";
import { serverAuth, serverRegister } from "../../api";
import { getRequest as getProfile } from "../profile";

function* authorizationSaga() {
    yield takeEvery(authRequest, function* (action) {
        const { email, password } = action.payload;
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
    });
};

function* registrationSaga() {
    yield takeEvery(registrationRequest, function* (action) {
        const { email, password, surname, name } = action.payload;
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
    });
};

function* handleSuccess() {
    yield takeLatest([authSuccess, registrationSuccess], function* (action) {
        const token = action.payload;
        yield put(getProfile({ token }));
    });
}

export default function* rootSaga() {
    yield fork(authorizationSaga);
    yield fork(registrationSaga);
    yield fork(handleSuccess);
}
