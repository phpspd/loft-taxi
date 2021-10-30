import { authRequest, authSuccess, authFailure, registrationRequest, registrationSuccess, registrationFailure } from "./actions";
import { getRequest } from "../profile/actions";
import { serverAuth, serverRegister } from "../../api";
import { recordSaga } from "../../helpers/recordSaga";
import userRootSaga, { authorizationSaga, registrationSaga, handleSuccessSaga } from "./sagas";
import { addressListRequest } from "../route/actions";

jest.mock("../../api");

describe("module user", () => {
    const mockApiSuccess = function() {
        serverAuth.mockImplementation(async () => ({
            success: true,
            token: "authSuccessToken"
        }));
        serverRegister.mockImplementation(async () => ({
            success: true,
            token: "registerSuccessToken"
        }));
    };
    const mockApiFailure = function() {
        serverAuth.mockImplementation(async () => ({
            error: "authError"
        }));
        serverRegister.mockImplementation(async () => ({
            error: "registerError"
        }));
    };
    const mockApiThrowsError = function() {
        serverAuth.mockImplementation(async () => {
            throw new Error("authCatchedError")
        });
        serverRegister.mockImplementation(async () => {
            throw new Error("registerCatchedError")
        });
    };
    const mockUnknownAction = {
        type: "unknownType",
        token: "testtoken",
        toString: function() { return this.type }
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("authorizationSaga", () => {
        describe("AUTH_REQUEST", () => {
            it("authenticates through api", async () => {
                mockApiSuccess();

                const email = "email@test.com";
                const password = "testpassword";
    
                await recordSaga(
                    authorizationSaga,
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
    
                const dispatched = await recordSaga(
                    authorizationSaga,
                    authRequest({})
                );

                expect(dispatched).toEqual([
                    authSuccess("authSuccessToken")
                ]);
            });

            it("dispatches AUTH_FAILURE if not authenticates", async () => {
                mockApiFailure();
    
                const dispatched = await recordSaga(
                    authorizationSaga,
                    authRequest({})
                );

                expect(dispatched).toEqual([
                    authFailure("authError")
                ]);
            });

            it("dispatches AUTH_FAILURE if catches error", async () => {
                mockApiThrowsError();
    
                const dispatched = await recordSaga(
                    authorizationSaga,
                    authRequest({})
                );

                expect(dispatched).toEqual([
                    authFailure(new Error("authCatchedError"))
                ]);
            });
        });
    });

    describe("registrationSaga", () => {
        describe("REGISTRATION_REQUEST", () => {
            it("registration through api", async () => {
                mockApiSuccess();

                const email = "email@test.com";
                const password = "testpassword";
                const surname = "testname";
                const name = "testsurname";
    
                await recordSaga(
                    registrationSaga,
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
    
                const dispatched = await recordSaga(
                    registrationSaga,
                    registrationRequest({})
                );

                expect(dispatched).toEqual([
                    registrationSuccess("registerSuccessToken")
                ]);
            });

            it("dispatches REGISTRATION_FAILURE if not authenticates", async () => {
                mockApiFailure();
    
                const dispatched = await recordSaga(
                    registrationSaga,
                    registrationRequest({})
                );

                expect(dispatched).toEqual([
                    registrationFailure("registerError")
                ]);
            });

            it("dispatches REGISTRATION_FAILURE if catches error", async () => {
                mockApiThrowsError();
    
                const dispatched = await recordSaga(
                    registrationSaga,
                    registrationRequest({})
                );

                expect(dispatched).toEqual([
                    registrationFailure(new Error("registerCatchedError"))
                ]);
            });
        });

        describe("handleSuccessSaga", () => {
            describe("AUTH_SUCCESS", () => {
                it("dispatches GET_REQUEST and ADDRESS_LIST_REQUEST", async () => {
                    const dispatched = await recordSaga(
                        handleSuccessSaga,
                        authSuccess("testToken")
                    );
    
                    expect(dispatched).toEqual([
                        getRequest({
                            token: "testToken"
                        }),
                        addressListRequest()
                    ]);
                });
            });
    
            describe("REGISTRATION_SUCCESS", () => {
                it("dispatches GET_REQUEST and ADDRESS_LIST_REQUEST", async () => {
                    const dispatched = await recordSaga(
                        handleSuccessSaga,
                        registrationSuccess("testToken")
                    );
    
                    expect(dispatched).toEqual([
                        getRequest({
                            token: "testToken"
                        }),
                        addressListRequest()
                    ]);
                });
            });
        });

        describe("other actions", () => {
            it("not calls api with unknown action", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    userRootSaga,
                    mockUnknownAction
                );
    
                expect(serverAuth).not.toBeCalled();
                expect(serverRegister).not.toBeCalled();
                expect(dispatched.length).toEqual(0);
            });
        });
    });
});
