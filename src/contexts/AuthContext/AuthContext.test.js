import React from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("AuthContext", () => {
    describe("#logIn", () => {
        it("not sets 'isLoggedIn' to true and returns false if login and/or password incorrect", () => {
            let isLoggedIn;
            let logIn;
            render(
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            isLoggedIn = value.isLoggedIn;
                            logIn = value.logIn;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            );
            act(() => {
                expect(logIn("test@test.com", "1")).toBe(false);
            });
            expect(isLoggedIn).toBe(false);
            act(() => {
                expect(logIn("test@", "123123")).toBe(false);
            });
            expect(isLoggedIn).toBe(false);
            act(() => {
                expect(logIn("test@", "1")).toBe(false);
            });
            expect(isLoggedIn).toBe(false);
        });

        it("sets 'isLoggedIn' to true", () => {
            let isLoggedIn;
            let logIn;
            render(
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            isLoggedIn = value.isLoggedIn;
                            logIn = value.logIn;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            );
            expect(isLoggedIn).toBe(false);
            act(() => {
                logIn("test@test.com", "123123");
            });
            expect(isLoggedIn).toBe(true);
        });
    });
    describe("#logOut", () => {
        it("sets 'isLoggedIn' to false", () => {
            let isLoggedIn;
            let logIn;
            let logOut;
            render(
                <AuthProvider>
                    <AuthContext.Consumer>
                        {(value) => {
                            isLoggedIn = value.isLoggedIn;
                            logIn = value.logIn;
                            logOut = value.logOut;
                            return null;
                        }}
                    </AuthContext.Consumer>
                </AuthProvider>
            );
            act(() => {
                logIn("test@test.com", "123123");
            });
            expect(isLoggedIn).toBe(true);
            act(() => {
                logOut();
            });
            expect(isLoggedIn).toBe(false);
        });
    });
});
