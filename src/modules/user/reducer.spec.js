import reducer from "./reducer";
import * as userActions from "./actions";

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

    describe("isLoggedIn", () => {
        it("changes to false if receives authRequest", () => {
            expect(reducer({ isLoggedIn: true }, userActions.authRequest())).toMatchObject({
                isLoggedIn: false
            });
        });
    
        it("changes to true if receives authSuccess", () => {
            expect(reducer({ isLoggedIn: false }, userActions.authSuccess())).toMatchObject({
                isLoggedIn: true
            });
        });
    
        it("changes to true if receives authLogOut", () => {
            expect(reducer({ isLoggedIn: true }, userActions.authLogOut())).toMatchObject({
                isLoggedIn: false
            });
        });
    
        it("changes to false if receives registrationRequest", () => {
            expect(reducer({ isLoggedIn: true }, userActions.registrationRequest())).toMatchObject({
                isLoggedIn: false
            });
        });
    
        it("changes to true if receives registrationSuccess", () => {
            expect(reducer({ isLoggedIn: false }, userActions.registrationSuccess())).toMatchObject({
                isLoggedIn: true
            });
        });
    });
});
