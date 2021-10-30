import { takeEvery, call, put } from "redux-saga/effects";
import { addressListRequest, addressListRequestSuccess, addressListRequestFailure, getRouteRequest, getRouteRequestSuccess, getRouteRequestFailure } from "./actions";
import { serverAddressList, serverGetRoute } from "../../api";

export function* addressListSaga() {
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
};

export function* getRouteSaga({ payload }) {
    const { from, to } = payload;
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
}

export default function* routeRootSaga() {
    yield takeEvery(addressListRequest, addressListSaga);
    yield takeEvery(getRouteRequest, getRouteSaga);
}
