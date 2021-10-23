import { getRequestMiddleware, saveRequestMiddleware } from "./middlewares";
import { getRequest, saveRequest } from "./actions";
import { waitFor } from "@testing-library/react";

describe("module profile", () => {
    let dispatch;
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

    describe("getRequestMiddleware", () => {
        const mockFetch = function(success) {
            jest.spyOn(global, "fetch").mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    error: !success
                })
            });
        };

        describe("GET_REQUEST", () => {
            it("gets profile details through fetch", () => {
                mockFetch();
    
                const data = { token: "testtoken" };
    
                getRequestMiddleware({ dispatch })()(
                    getRequest(data)
                );
    
                expect(fetch).toBeCalled();
                expect(fetch.mock.calls[0][0]).toContain("token=" + data.token);
            });

            it("dispatches GET_SUCCESS if gets profile", async () => {
                mockFetch(true);

                await waitFor(() =>
                    getRequestMiddleware({ dispatch })()(
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
                mockFetch();

                await waitFor(() =>
                    getRequestMiddleware({ dispatch })()(
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
                mockFetchThrowsError();

                await waitFor(() =>
                    getRequestMiddleware({ dispatch })()(
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

        describe("other actions", () => {
            it("not calls fetch with unknown action", () => {
                mockFetch();
    
                getRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(fetch).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockFetch();
    
                getRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
    
    describe("saveRequestMiddleware", () => {
        const mockFetch = function(success) {
            jest.spyOn(global, "fetch").mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    success
                })
            });
        };

        describe("saveRequest", () => {
            it("saves profile details through fetch", async () => {
                mockFetch();
                
                const data = {
                    cardHolder: "testCardHolder",
                    cardNumber: "testCardNumber",
                    expiryDate: "testExpiryDate",
                    cvc: "testCvc",
                    token: "testToken"
                };
                const { cardHolder, ...restData } = data;
    
                await waitFor(() =>
                    saveRequestMiddleware({ dispatch })()(
                        saveRequest(data)
                    )
                );
    
                expect(fetch).toBeCalled();
                expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({
                    cardName: cardHolder,
                    ...restData
                }));
            });

            it("dispatches SAVE_SUCCESS if saves profile", async () => {
                mockFetch(true);

                await waitFor(() =>
                    saveRequestMiddleware({ dispatch })()(
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
                mockFetch();

                await waitFor(() =>
                    saveRequestMiddleware({ dispatch })()(
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
                mockFetchThrowsError();

                await waitFor(() =>
                    saveRequestMiddleware({ dispatch })()(
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
            it("not calls fetch with unknown action", () => {
                mockFetch();
    
                saveRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(fetch).not.toBeCalled();
            });
            
            it("calls next with unknown action", () => {
                mockFetch();
    
                saveRequestMiddleware({ dispatch })(next)(
                    mockUnknownAction
                );
    
                expect(next).toBeCalledWith(mockUnknownAction);
            });
        });
    });
});
