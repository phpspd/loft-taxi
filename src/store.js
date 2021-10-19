import { createStore, compose, applyMiddleware } from "redux";
import { authRequestMiddleware, registrationRequestMiddleware } from "./modules/user";
import rootReducer from "./modules";

const createAppStore = () => {
    const store = createStore(
        rootReducer,
        getPersistedState(),
        compose(
            applyMiddleware(authRequestMiddleware),
            applyMiddleware(registrationRequestMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__
              ? window.__REDUX_DEVTOOLS_EXTENSION__()
              : noop => noop
        )
    );

    withPersistState(store);

    return store;
};

function getPersistedState() {
    return localStorage.getItem("loft-taxi")
        ? JSON.parse(localStorage.getItem("loft-taxi"))
        : {}
}

function withPersistState(store) {
    store.subscribe(() => localStorage.setItem("loft-taxi", JSON.stringify(store.getState())));
}

export default createAppStore;
