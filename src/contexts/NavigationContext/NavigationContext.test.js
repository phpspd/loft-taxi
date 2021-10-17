import React from "react";
import { NavigationProvider, NavigationContext } from "./NavigationContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AuthContext, AuthProvider } from "../AuthContext/AuthContext";

describe("NavigationContext", () => {
    describe("#navigateTo", () => {
        it("sets 'currentPage' to 'Registration'", () => {
            let currentPage;
            let navigateTo;
            render(
                <NavigationProvider>
                    <NavigationContext.Consumer>
                        {(value) => {
                            currentPage = value.currentPage;
                            navigateTo = value.navigateTo;
                            return null;
                        }}
                    </NavigationContext.Consumer>
                </NavigationProvider>
            );
            expect(currentPage).toBe("Login");
            act(() => {
                navigateTo("Registration");
            });
            expect(currentPage).toBe("Registration");
        });
        it("cannot set 'currentPage' to any of values ['Map', 'Profile'] without authotization", () => {
            let currentPage;
            let navigateTo;
            render(
                <NavigationProvider>
                    <NavigationContext.Consumer>
                        {(value) => {
                            currentPage = value.currentPage;
                            navigateTo = value.navigateTo;
                            return null;
                        }}
                    </NavigationContext.Consumer>
                </NavigationProvider>
            );
            act(() => {
                navigateTo("Map");
            });
            expect(currentPage).toBe("Login");
            act(() => {
                navigateTo("Profile");
            });
            expect(currentPage).toBe("Login");
        });
        it("can set 'currentPage' to every of values ['Map', 'Profile'] with authotization", () => {
            let currentPage;
            let navigateTo;
            let logIn;
            render(
                <AuthProvider>
                    <NavigationProvider>
                        <AuthContext.Consumer>
                            {(value) => {
                                logIn = value.logIn;
                                return null;
                            }}
                        </AuthContext.Consumer>
                        <NavigationContext.Consumer>
                            {(value) => {
                                currentPage = value.currentPage;
                                navigateTo = value.navigateTo;
                                return null;
                            }}
                        </NavigationContext.Consumer>
                    </NavigationProvider>
                </AuthProvider>
            );
            act(() => {
                logIn("test@test.com", "123123");
            });
            act(() => {
                navigateTo("Map");
            });
            expect(currentPage).toBe("Map");
            act(() => {
                navigateTo("Profile");
            });
            expect(currentPage).toBe("Profile");
        });
    });
});
