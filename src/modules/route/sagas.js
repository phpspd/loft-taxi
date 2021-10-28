import { takeEvery, call, put, fork } from "redux-saga/effects";
import { addressListRequest, addressListRequestSuccess, addressListRequestFailure } from "./actions";
import { serverAddressList } from "../../api";

function* addressListSaga() {
    yield takeEvery([addressListRequest], function* (action) {
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

export default function* rootSaga() {
    yield fork(addressListSaga);
}
