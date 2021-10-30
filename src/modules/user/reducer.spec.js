import reducer from "./reducer";
import { authRequest, authSuccess, authFailure, authLogOut, registrationRequest, registrationSuccess, registrationFailure } from "./actions";

describe("user reducer", () => {
    it("returns initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            isLoggedIn: false,
            token: null,
            isProcessing: false,
            loginError: null,
            registrationError: null
        });
    });

    it("handles authRequest action correctly", () => {
        const state = {
            isLoggedIn: true,
            token: "someToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someRegError"
        }
        expect(reducer(state, authRequest())).toEqual({
            isLoggedIn: false,
            token: null,
            isProcessing: true,
            loginError: null,
            registrationError: "someRegError"
        });
    });

    it("handles authSuccess action correctly", () => {
        const state = {
            isLoggedIn: false,
            token: null,
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: "someRegError"
        }
        expect(reducer(state, authSuccess("someToken"))).toEqual({
            isLoggedIn: true,
            token: "someToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someRegError"
        });
    });

    it("handles authFailure action correctly", () => {
        const state = {
            isLoggedIn: true,
            token: "someLoginToken",
            isProcessing: true,
            loginError: null,
            registrationError: "someRegError"
        }
        expect(reducer(state, authFailure("someLoginError"))).toEqual({
            isLoggedIn: true,
            token: "someLoginToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someRegError"
        });
    });

    it("handles authLogOut action correctly", () => {
        const state = {
            isLoggedIn: true,
            token: "someLoginToken",
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: "someRegError"
        }
        expect(reducer(state, authLogOut())).toEqual({
            isLoggedIn: false,
            token: null,
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: "someRegError"
        });
    });

    it("handles registrationRequest action correctly", () => {
        const state = {
            isLoggedIn: true,
            token: "someLoginToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someRegError"
        }
        expect(reducer(state, registrationRequest())).toEqual({
            isLoggedIn: false,
            token: null,
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: null
        });
    });

    it("handles registrationSuccess action correctly", () => {
        const state = {
            isLoggedIn: false,
            token: null,
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: "someRegError"
        }
        expect(reducer(state, registrationSuccess("someToken"))).toEqual({
            isLoggedIn: true,
            token: "someToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someRegError"
        });
    });

    it("handles registrationFailure action correctly", () => {
        const state = {
            isLoggedIn: true,
            token: "someToken",
            isProcessing: true,
            loginError: "someLoginError",
            registrationError: null
        }
        expect(reducer(state, registrationFailure("someError"))).toEqual({
            isLoggedIn: true,
            token: "someToken",
            isProcessing: false,
            loginError: "someLoginError",
            registrationError: "someError"
        });
    });
});
