import { combineReducers, createStore } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

export const dispatched = [];

const defaultState = {
    user: {},
    profile: {},
    route: {}
};

const createStateReducers = (state = {}) => {
    const result = {};
    for (const field of Object.keys(state).concat(Object.keys(defaultState))) {
        result[field] = () => (state[field] || defaultState[field]);
    }
    return result;
};

export const createStoreMock = initialState => {
    dispatched.length = 0;

    const reducer = combineReducers({
        ...createStateReducers(initialState),
        form: reduxFormReducer
    });

    const store = createStore(reducer);

    const _dispatch = store.dispatch;

    store.dispatch = jest.fn(action => {
        if (/^loft-taxi/.test(action.type)) {
            dispatched.push(action);
        }
        _dispatch.call(store, action);
    });

    return store;
};
