import reducer from "./reducer";
import { getRequest, getSuccess, getFailure, saveRequest, saveSuccess, saveFailure, clearIsSaved } from "./actions";

describe("route reducer", () => {
    it("returns initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            isLoading: false,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: null,
            saveError: null,
            isSaved: false,
            isCardFilled: false
        });
    });

    it("handles getRequest action correctly", () => {
        const state = {
            isLoading: false,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: null,
            saveError: "someError",
            isSaved: false,
            isCardFilled: false
        }
        expect(reducer(state, getRequest())).toEqual({
            isLoading: true,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: null,
            saveError: null,
            isSaved: false,
            isCardFilled: false
        });
    });

    it("handles getSuccess action correctly", () => {
        const state = {
            isLoading: true,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: false
        };
        const payload = {
            cardHolder: "cardHolder1",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4"
        }
        expect(reducer(state, getSuccess(payload))).toEqual({
            isLoading: false,
            cardHolder: "cardHolder1",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: true
        });
    });

    it("handles getSuccess and set to false isCardFilled field if card not filled", () => {
        const state = {
            isLoading: true,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: true
        };
        const payload = {
            cardHolder: "",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4"
        }
        expect(reducer(state, getSuccess(payload))).toEqual({
            isLoading: false,
            cardHolder: "",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: false
        });
    });

    it("handles getFailure action correctly", () => {
        const state = {
            isLoading: true,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: null,
            saveError: "someError",
            isSaved: false,
            isCardFilled: true
        }
        expect(reducer(state, getFailure("someGetError"))).toEqual({
            isLoading: false,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: "someGetError",
            saveError: "someError",
            isSaved: false,
            isCardFilled: false
        });
    });

    it("handles saveRequest action correctly", () => {
        const state = {
            isLoading: false,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: "someError",
            saveError: "someError",
            isSaved: true,
            isCardFilled: true
        }
        expect(reducer(state, saveRequest())).toEqual({
            isLoading: true,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: "someError",
            saveError: null,
            isSaved: false,
            isCardFilled: true
        });
    });

    it("handles saveSuccess action correctly", () => {
        const state = {
            isLoading: true,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: false
        };
        const payload = {
            cardHolder: "cardHolder1",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4"
        }
        expect(reducer(state, saveSuccess(payload))).toEqual({
            isLoading: false,
            cardHolder: "cardHolder1",
            cardNumber: "cardNumber2",
            expiryDate: "expiryDate3",
            cvc: "cvc4",
            getError: 1,
            saveError: "someError",
            isSaved: true,
            isCardFilled: true
        });
    });

    it("handles saveSuccess and set to false isCardFilled field if card not filled", () => {
        const state = {
            isLoading: true,
            cardHolder: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            getError: 1,
            saveError: "someError",
            isSaved: false,
            isCardFilled: true
        };
        const payload = {
            cardHolder: "cardHolder1",
            cardNumber: "",
            expiryDate: "expiryDate3",
            cvc: "cvc4"
        }
        expect(reducer(state, saveSuccess(payload))).toEqual({
            isLoading: false,
            cardHolder: "cardHolder1",
            cardNumber: "",
            expiryDate: "expiryDate3",
            cvc: "cvc4",
            getError: 1,
            saveError: "someError",
            isSaved: true,
            isCardFilled: false
        });
    });

    it("handles saveFailure action correctly", () => {
        const state = {
            isLoading: true,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: 1,
            saveError: null,
            isSaved: true,
            isCardFilled: true
        }
        expect(reducer(state, saveFailure("saveError"))).toEqual({
            isLoading: false,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: 1,
            saveError: "saveError",
            isSaved: true,
            isCardFilled: false
        });
    });

    it("handles clearIsSaved action correctly", () => {
        const state = {
            isLoading: true,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: 1,
            saveError: 2,
            isSaved: true,
            isCardFilled: true
        }
        expect(reducer(state, clearIsSaved())).toEqual({
            isLoading: true,
            cardHolder: "1",
            cardNumber: "2",
            expiryDate: "3",
            cvc: "4",
            getError: 1,
            saveError: 2,
            isSaved: false,
            isCardFilled: true
        });
    });
});
