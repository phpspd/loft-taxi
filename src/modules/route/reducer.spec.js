import reducer from "./reducer";
import { addressListRequest, addressListRequestSuccess, addressListRequestFailure, getRouteRequest, getRouteRequestSuccess, getRouteRequestFailure, clearRoute } from "./actions";

describe("route reducer", () => {
    it("returns initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            isLoading: false,
            addressList: [],
            addressListError: null,
            routeIsLoading: false,
            routePoints: null
        });
    });

    it("handles addressListRequest action correctly", () => {
        const state = {
            isLoading: false,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: [321]
        }
        expect(reducer(state, addressListRequest())).toEqual({
            isLoading: true,
            addressList: [],
            addressListError: null,
            routeIsLoading: true,
            routePoints: [321]
        });
    });

    it("handles addressListRequestSuccess action correctly", () => {
        const state = {
            isLoading: true,
            addressList: [],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: [321]
        }
        expect(reducer(state, addressListRequestSuccess([111]))).toEqual({
            isLoading: false,
            addressList: [111],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: [321]
        });
    });

    it("handles addressListRequestFailure action correctly", () => {
        const state = {
            isLoading: true,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: [321]
        }
        expect(reducer(state, addressListRequestFailure("someAddressListError"))).toEqual({
            isLoading: false,
            addressList: [123],
            addressListError: "someAddressListError",
            routeIsLoading: true,
            routePoints: [321]
        });
    });

    it("handles getRouteRequest action correctly", () => {
        const state = {
            isLoading: true,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: false,
            routePoints: [321]
        }
        expect(reducer(state, getRouteRequest())).toEqual({
            isLoading: true,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: null
        });
    });

    it("handles getRouteRequestSuccess action correctly", () => {
        const state = {
            isLoading: true,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: []
        }
        expect(reducer(state, getRouteRequestSuccess([333]))).toEqual({
            isLoading: true,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: false,
            routePoints: [333]
        });
    });

    it("handles getRouteRequestFailure action correctly", () => {
        const state = {
            isLoading: 12,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: []
        }
        expect(reducer(state, getRouteRequestFailure("routeError"))).toEqual({
            isLoading: 12,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: false,
            routePoints: []
        });
    });

    it("handles clearRoute action correctly", () => {
        const state = {
            isLoading: 12,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: [[12, 23], [34, 45]]
        }
        expect(reducer(state, clearRoute())).toEqual({
            isLoading: 12,
            addressList: [123],
            addressListError: "error",
            routeIsLoading: true,
            routePoints: null
        });
    });
});
