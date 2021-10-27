import { takeLatest, call, put, fork } from "redux-saga/effects";
import { getRequest, getFailure, getSuccess, saveRequest, saveSuccess, saveFailure } from "./actions";
import { serverGetCard, serverSaveCard } from "../../api";

function* paymentSaga() {
    yield takeLatest([getRequest, saveRequest], function* (action) {
        if (action.type === getRequest.toString()) {
            const { token } = action.payload;
            try {
                const { cardName, cardNumber, expiryDate, cvc, error } = yield call(serverGetCard, token);
                if (error) {
                    yield put(getFailure(error));
                } else {
                    yield put(getSuccess({ cardHolder: cardName, cardNumber, expiryDate, cvc }));
                }
            } catch(error) {
                yield put(getFailure(error));
            }
        } else if (action.type === saveRequest.toString()) {
            const { cardHolder, cardNumber, expiryDate, cvc, token } = action.payload;
            try {
                const { success, error } = yield call(serverSaveCard, cardHolder, cardNumber, expiryDate, cvc, token);
                if (success) {
                    yield put(saveSuccess({ cardHolder, cardNumber, expiryDate, cvc }));
                } else {
                    yield put(saveFailure(error));
                }
            } catch(error) {
                yield put(saveFailure(error));
            }
        }
    });
};

export default function* rootSaga() {
    yield fork(paymentSaga);
}
