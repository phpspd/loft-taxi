import { takeEvery, call, put, fork } from "redux-saga/effects";
import { addressListRequest, addressListRequestSuccess, addressListRequestFailure, getRouteRequest, getRouteRequestSuccess, getRouteRequestFailure } from "./actions";
import { serverAddressList, serverGetRoute } from "../../api";

function* addressListSaga() {
    yield takeEvery(addressListRequest, function* () {
        try {
            const { error, addresses } = yield call(serverAddressList);
            if (error) {
                yield put(addressListRequestFailure(error));
            } else {
                yield put(addressListRequestSuccess(addresses));
            }
        } catch(error) {
            yield put(addressListRequestFailure(error));
        }
    });
};

function* routeSaga() {
    yield takeEvery(getRouteRequest, function* (action) {
        const { from, to } = action.payload;
        try {
            const { error, points } = yield call(serverGetRoute, from, to);
            if (error) {
                yield put(getRouteRequestFailure(error));
            } else {
                yield put(getRouteRequestSuccess(points));
            }
        } catch(error) {
            yield put(getRouteRequestFailure(error));
        }
    });
}

export default function* rootSaga() {
    yield fork(addressListSaga);
    yield fork(routeSaga);
}
