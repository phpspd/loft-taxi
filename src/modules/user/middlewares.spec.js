import { authRequestMiddleware, registrationRequestMiddleware } from "./middlewares";
import { authRequest, registrationRequest, authSuccess, registrationSuccess } from "./actions";
import { waitFor } from "@testing-library/react";

describe("module user", () => {
    let dispatch;
    const mockFetch = function(success) {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                success
            })
        });
    };
    const mockFetchThrowsError = function() {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockImplementation(() => {
                throw new Error();
            })
        });
    };
    const mockUnknownAction = {
        type: "unknownType",
        token: "testtoken",
        toString: function() { return this.type }
    };
    const next = jest.fn();

    beforeEach(() => {
        dispatch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("authRequestMiddleware", () => {
        describe("AUTH_REQUEST", () => {
            it("authenticates through fetch", () => {
                mockFetch();

                const data = { email: "email@test.com", password: "testpassword" };
    
                authRequestMiddleware({ dispatch })()(
                    authRequest(data)
                );
    
                expect(fetch).toBeCalled();
                expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(data));
            });

            it("dispatches AUTH_SUCCESS if authenticates", async () => {
                mockFetch(true);

                await waitFor(() =>
                    authRequestMiddleware({ dispatch })()(
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
                mockFetch();
                
                await waitFor(() =>
                    authRequestMiddleware({ dispatch })()(
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
                mockFetchThrowsError();
                
                await waitFor(() =>
                    authRequestMiddleware({ dispatch })()(
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
                authRequestMiddleware({ dispatch })()(
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
                authRequestMiddleware({ dispatch })()(
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

        describe("other actions", () => {
            it("not calls fetch with unknown action", () => {
                mockFetch();
    
                authRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(fetch).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockFetch();
    
                authRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
    
    describe("registrationRequestMiddleware", () => {
        describe("REGISTRATION_REQUEST", () => {
            it("registration through fetch", async () => {
                mockFetch();

                const data = {
                    email: "email@test.com",
                    password: "testpassword",
                    name: "testname",
                    surname: "testsurname"
                };
    
                registrationRequestMiddleware({ dispatch })()(
                    registrationRequest(data)
                );
    
                expect(fetch).toBeCalled();
                expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(data));
            });

            it("dispatches REGISTRATION_SUCCESS if authenticates", async () => {
                mockFetch(true);

                jest.spyOn(global, "fetch").mockResolvedValue({
                    json: jest.fn().mockResolvedValue({
                        success: true
                    })
                });
    
                await waitFor(() =>
                    registrationRequestMiddleware({ dispatch })()(
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
                mockFetch();
    
                await waitFor(() =>
                    registrationRequestMiddleware({ dispatch })()(
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
                mockFetchThrowsError();
    
                await waitFor(() =>
                    registrationRequestMiddleware({ dispatch })()(
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
            it("not calls fetch with unknown action", () => {
                mockFetch();
    
                registrationRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(fetch).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockFetch();
    
                registrationRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
});
