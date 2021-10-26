import { userMiddleware } from "./middlewares";
import { authRequest, registrationRequest, authSuccess, registrationSuccess } from "./actions";
import { waitFor } from "@testing-library/react";
import { serverAuth, serverRegister } from "../../api";

jest.mock("../../api");

describe("module user", () => {
    let dispatch;
    const next = jest.fn();
    const mockApiSuccess = function() {
        serverAuth.mockImplementation(async () => ({
            success: true
        }));
        serverRegister.mockImplementation(async () => ({
            success: true
        }));
    };
    const mockApiFailure = function() {
        serverAuth.mockImplementation(async () => ({
            error: true
        }));
        serverRegister.mockImplementation(async () => ({
            error: true
        }));
    };
    const mockApiThrowsError = function() {
        serverAuth.mockImplementation(async () => {
            throw new Error();
        });
        serverRegister.mockImplementation(async () => {
            throw new Error();
        });
    };
    const mockUnknownAction = {
        type: "unknownType",
        token: "testtoken",
        toString: function() { return this.type }
    };

    beforeEach(() => {
        dispatch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("userMiddleware", () => {
        describe("AUTH_REQUEST", () => {
            it("authenticates through api", () => {
                mockApiSuccess();

                const email = "email@test.com";
                const password = "testpassword";
    
                userMiddleware({ dispatch })(next)(
                    authRequest({
                        email,
                        password
                    })
                );
    
                expect(serverAuth).toBeCalled();
                expect(serverAuth.mock.calls[0][0]).toEqual(email);
                expect(serverAuth.mock.calls[0][1]).toEqual(password);
            });

            it("dispatches AUTH_SUCCESS if authenticates", async () => {
                mockApiSuccess();

                await waitFor(() =>
                    userMiddleware({ dispatch })(next)(
                        authRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/AUTH_SUCCESS"
                    })
                );
            });

            it("dispatches AUTH_FAILURE if not authenticates", async () => {
                mockApiFailure();
                
                await waitFor(() =>
                    userMiddleware({ dispatch })(next)(
                        authRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/AUTH_FAILURE"
                    })
                );
            });

            it("dispatches AUTH_FAILURE if catches error", async () => {
                mockApiThrowsError();
                
                await waitFor(() =>
                    userMiddleware({ dispatch })(next)(
                        authRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/AUTH_FAILURE"
                    })
                );
            });
        });

        describe("AUTH_SUCCESS", () => {
            it("dispatches GET_REQUEST", () => {
                userMiddleware({ dispatch })(next)(
                    authSuccess("testToken")
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/GET_REQUEST",
                        payload: {
                            token: "testToken"
                        }
                    })
                );
            });
        });

        describe("REGISTRATION_SUCCESS", () => {
            it("dispatches GET_REQUEST", () => {
                userMiddleware({ dispatch })(next)(
                    registrationSuccess("testToken")
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/GET_REQUEST",
                        payload: {
                            token: "testToken"
                        }
                    })
                );
            });
        });

        describe("REGISTRATION_REQUEST", () => {
            it("registration through api", async () => {
                mockApiSuccess();

                const email = "email@test.com";
                const password = "testpassword";
                const surname = "testname";
                const name = "testsurname";
    
                userMiddleware({ dispatch })(next)(
                    registrationRequest({
                        email,
                        password,
                        surname,
                        name
                    })
                );
    
                expect(serverRegister).toBeCalled();
                expect(serverRegister.mock.calls[0][0]).toEqual(email);
                expect(serverRegister.mock.calls[0][1]).toEqual(password);
                expect(serverRegister.mock.calls[0][2]).toEqual(surname);
                expect(serverRegister.mock.calls[0][3]).toEqual(name);
            });

            it("dispatches REGISTRATION_SUCCESS if authenticates", async () => {
                mockApiSuccess();
    
                await waitFor(() =>
                    userMiddleware({ dispatch })(next)(
                        registrationRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/REGISTRATION_SUCCESS"
                    })
                );
            });

            it("dispatches REGISTRATION_FAILURE if not authenticates", async () => {
                mockApiFailure();
    
                await waitFor(() =>
                    userMiddleware({ dispatch })(next)(
                        registrationRequest({})
                    )
                );
                
                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/REGISTRATION_FAILURE"
                    })
                );
            });

            it("dispatches REGISTRATION_FAILURE if catches error", async () => {
                mockApiThrowsError();
    
                await waitFor(() =>
                userMiddleware({ dispatch })(next)(
                        registrationRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/user/REGISTRATION_FAILURE"
                    })
                );
            });
        });

        describe("other actions", () => {
            it("not calls api with unknown action", () => {
                mockApiSuccess();
    
                userMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(serverAuth).not.toBeCalled();
                expect(serverRegister).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockApiSuccess();
    
                userMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
});
