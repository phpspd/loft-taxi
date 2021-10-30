import { addressListRequest, addressListRequestSuccess, addressListRequestFailure, getRouteRequest, getRouteRequestSuccess, getRouteRequestFailure } from "./actions";
import { serverAddressList, serverGetRoute } from "../../api";
import { recordSaga } from "../../helpers/recordSaga";
import routeRootSaga, { addressListSaga, getRouteSaga } from "./sagas";

jest.mock("../../api");

describe("module route", () => {
    const mockApiSuccess = function () {
        serverAddressList.mockImplementation(async () => ({
            addresses: [
                "address1",
                "address2"
            ]
        }));
        serverGetRoute.mockImplementation(async () => ({
            points: [
                [
                    1, 1
                ], [
                    2, 2
                ]
            ]
        }));
    };
    const mockApiFailure = function () {
        serverAddressList.mockImplementation(async () => ({
            error: "addressListError"
        }));
        serverGetRoute.mockImplementation(async () => ({
            error: "getRouteError"
        }));
    };
    const mockApiThrowsError = function () {
        serverAddressList.mockImplementation(async () => {
            throw new Error("addressListThrownError");
        });
        serverGetRoute.mockImplementation(async () => {
            throw new Error("getRouteThrownError");
        });
    };
    const mockUnknownAction = {
        type: "unknownType",
        toString: function () { return this.type }
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("addressListSaga", function () {
        describe("ADDRESS_LIST_REQUEST", () => {
            it("gets addressList through api", async () => {
                mockApiSuccess();

                await recordSaga(
                    addressListSaga,
                    addressListRequest()
                );

                expect(serverAddressList).toBeCalled();
                expect(serverAddressList.mock.calls[0].length).toEqual(0);
            });

            it("dispatches ADDRESS_LIST_REQUEST_SUCCESS if gets addresses", async () => {
                mockApiSuccess();

                const dispatched = await recordSaga(
                    addressListSaga,
                    addressListRequest()
                );

                expect(dispatched).toEqual([
                    addressListRequestSuccess([
                        "address1",
                        "address2"
                    ])
                ]);
            });

            it("dispatches ADDRESS_LIST_REQUEST_FAILURE if gets error", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    addressListSaga,
                    addressListRequest()
                );

                expect(dispatched).toEqual([
                    addressListRequestFailure("addressListError")
                ]);
            });

            it("dispatches ADDRESS_LIST_REQUEST_FAILURE if catches error", async () => {
                mockApiThrowsError();

                const dispatched = await recordSaga(
                    addressListSaga,
                    addressListRequest()
                );

                expect(dispatched).toEqual([
                    addressListRequestFailure(new Error("addressListThrownError"))
                ]);
            });
        });
    });

    describe("getRouteSaga", function () {
        describe("GET_ROUTE_REQUEST", () => {
            it("gets route points through api", async () => {
                mockApiSuccess();

                const from = "from";
                const to = "to";

                await recordSaga(
                    getRouteSaga,
                    getRouteRequest({
                        from,
                        to
                    })
                );

                expect(serverGetRoute).toBeCalled();
                expect(serverGetRoute.mock.calls[0][0]).toEqual(from);
                expect(serverGetRoute.mock.calls[0][1]).toEqual(to);
            });

            it("dispatches GET_ROUTE_REQUEST_SUCCESS if get route points", async () => {
                mockApiSuccess();

                const dispatched = await recordSaga(
                    getRouteSaga,
                    getRouteRequest({})
                );

                expect(dispatched).toEqual([
                    getRouteRequestSuccess([
                        [
                            1, 1
                        ], [
                            2, 2
                        ]
                    ])
                ]);
            });

            it("dispatches GET_ROUTE_REQUEST_FAILURE if gets error", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    getRouteSaga,
                    getRouteRequest({})
                );

                expect(dispatched).toEqual([
                    getRouteRequestFailure("getRouteError")
                ]);
            });

            it("dispatches GET_ROUTE_REQUEST_FAILURE if catches error", async () => {
                mockApiThrowsError();

                const dispatched = await recordSaga(
                    getRouteSaga,
                    getRouteRequest({})
                );

                expect(dispatched).toEqual([
                    getRouteRequestFailure(new Error("getRouteThrownError"))
                ]);
            });
        });

        describe("other actions", () => {
            it("not calls api with unknown action", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    routeRootSaga,
                    mockUnknownAction
                );

                expect(serverAddressList).not.toBeCalled();
                expect(serverGetRoute).not.toBeCalled();
                expect(dispatched.length).toEqual(0);
            });
        });
    });
});
