import { profileMiddleware } from "./middlewares";
import { getRequest, saveRequest } from "./actions";
import { waitFor } from "@testing-library/react";
import { serverGetCard, serverSaveCard } from "../../api";

jest.mock("../../api");

describe("module profile", () => {
    let dispatch;
    const next = jest.fn();
    const mockApiSuccess = function() {
        serverGetCard.mockImplementation(async () => ({
            success: true
        }));
        serverSaveCard.mockImplementation(async () => ({
            success: true
        }));
    };
    const mockApiFailure = function() {
        serverGetCard.mockImplementation(async () => ({
            error: true
        }));
        serverSaveCard.mockImplementation(async () => ({
            error: true
        }));
    };
    const mockApiThrowsError = function() {
        serverGetCard.mockImplementation(async () => {
            throw new Error();
        });
        serverSaveCard.mockImplementation(async () => {
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

    describe("profileMiddleware", () => {

        describe("GET_REQUEST", () => {
            it("gets profile details through api", () => {
                mockApiSuccess();
    
                const token = "testtoken";
    
                profileMiddleware({ dispatch })(next)(
                    getRequest({
                        token
                    })
                );
    
                expect(serverGetCard).toBeCalled();
                expect(serverGetCard.mock.calls[0][0]).toContain(token);
            });

            it("dispatches GET_SUCCESS if gets profile", async () => {
                mockApiSuccess();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        getRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/GET_SUCCESS"
                    })
                );
            });

            it("dispatches GET_FAILURE if not gets profile", async () => {
                mockApiFailure();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        getRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/GET_FAILURE"
                    })
                );
            });

            it("dispatches GET_FAILURE if catches error", async () => {
                mockApiThrowsError();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        getRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/GET_FAILURE"
                    })
                );
            });
        });

        describe("saveRequest", () => {
            it("saves profile details through api", async () => {
                mockApiSuccess();
                
                const cardHolder = "testCardHolder";
                const cardNumber = "testCardNumber";
                const expiryDate = "testExpiryDate";
                const cvc = "testCvc";
                const token = "testToken";
    
                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        saveRequest({
                            cardHolder,
                            cardNumber,
                            expiryDate,
                            cvc,
                            token
                        })
                    )
                );
    
                expect(serverSaveCard).toBeCalled();
                expect(serverSaveCard.mock.calls[0][0]).toEqual(cardHolder);
                expect(serverSaveCard.mock.calls[0][1]).toEqual(cardNumber);
                expect(serverSaveCard.mock.calls[0][2]).toEqual(expiryDate);
                expect(serverSaveCard.mock.calls[0][3]).toEqual(cvc);
                expect(serverSaveCard.mock.calls[0][4]).toEqual(token);
            });

            it("dispatches SAVE_SUCCESS if saves profile", async () => {
                mockApiSuccess();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        saveRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/SAVE_SUCCESS"
                    })
                );
            });

            it("dispatches SAVE_FAILURE if not gets profile", async () => {
                mockApiFailure();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        saveRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/SAVE_FAILURE"
                    })
                );
            });

            it("dispatches SAVE_FAILURE if catches error", async () => {
                mockApiThrowsError();

                await waitFor(() =>
                    profileMiddleware({ dispatch })(next)(
                        saveRequest({})
                    )
                );

                expect(dispatch).toBeCalledWith(
                    expect.objectContaining({
                        type: "loft-taxi/profile/SAVE_FAILURE"
                    })
                );
            });
        });

        describe("other actions", () => {
            it("not calls api with unknown action", () => {
                mockApiFailure();
    
                profileMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(serverGetCard).not.toBeCalled();
                expect(serverSaveCard).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockApiSuccess();
    
                profileMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
});
