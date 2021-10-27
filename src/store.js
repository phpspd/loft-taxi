import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga as userRootSaga } from "./modules/user";
import { rootSaga as profileRootSaga } from "./modules/profile";
import rootReducer from "./modules";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
    const store = createStore(
        rootReducer,
        getPersistedState(),
        compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__
              ? window.__REDUX_DEVTOOLS_EXTENSION__()
              : noop => noop
        )
    );

    sagaMiddleware.run(userRootSaga);
    sagaMiddleware.run(profileRootSaga);

    withPersistedState(store);

    return store;
};

function getPersistedState() {
    return localStorage.getItem("loft-taxi")
        ? JSON.parse(localStorage.getItem("loft-taxi"))
        : {}
}

function withPersistedState(store) {
    store.subscribe(() => localStorage.setItem("loft-taxi", JSON.stringify(store.getState())));
}

export default createAppStore;
