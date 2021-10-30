import { getFailure, getRequest, getSuccess, saveFailure, saveRequest, saveSuccess } from "./actions";
import { serverGetCard, serverSaveCard } from "../../api";
import { recordSaga } from "../../helpers/recordSaga";
import profileRootSaga, { getPaymentSaga, savePaymentSaga } from "./sagas";

jest.mock("../../api");

describe("module profile", () => {
    const mockApiSuccess = function() {
        serverGetCard.mockImplementation(async () => ({
            success: true,
            cardName: "trueCardHolder",
            cardNumber: "trueCardNumber",
            expiryDate: "01/02",
            cvc: "012"
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
            throw new Error("some error occured");
        });
        serverSaveCard.mockImplementation(async () => {
            throw new Error("some error occured");
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

    describe("profileRootSaga", function () {
        describe("GET_REQUEST", () => {
            it("gets profile details through api", async () => {
                mockApiSuccess();

                const token = "testtoken";
                await recordSaga(
                    getPaymentSaga,
                    getRequest({ token })
                );

                expect(serverGetCard).toBeCalled();
                expect(serverGetCard.mock.calls[0][0]).toContain(token);
            });

            it("dispatches GET_SUCCESS if gets profile", async () => {
                mockApiSuccess();

                const dispatched = await recordSaga(
                    getPaymentSaga,
                    getRequest({ token: "" })
                );

                expect(dispatched).toEqual([
                    getSuccess({
                        cardHolder: "trueCardHolder",
                        cardNumber: "trueCardNumber",
                        expiryDate: "01/02",
                        cvc: "012"
                    })
                ]);
            });

            it("dispatches GET_FAILURE if not gets profile", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    getPaymentSaga,
                    getRequest({ token: "" })
                );

                expect(dispatched).toEqual([
                    getFailure(true)
                ]);
            });

            it("dispatches GET_FAILURE if catches error", async () => {
                mockApiThrowsError();

                const dispatched = await recordSaga(
                    getPaymentSaga,
                    getRequest({ token: "" })
                );

                expect(dispatched).toEqual([
                    getFailure(new Error("some error occured"))
                ]);
            });
        });

        describe("SAVE_REQUEST", () => {
            it("saves profile details through api", async () => {
                mockApiSuccess();
                
                const cardHolder = "testCardHolder";
                const cardNumber = "testCardNumber";
                const expiryDate = "testExpiryDate";
                const cvc = "testCvc";
                const token = "testToken";

                await recordSaga(
                    savePaymentSaga,
                    saveRequest({
                        cardHolder,
                        cardNumber,
                        expiryDate,
                        cvc,
                        token
                    })
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
                
                const cardHolder = "1";
                const cardNumber = "2";
                const expiryDate = "3";
                const cvc = "4";
                const token = "5";

                const dispatched = await recordSaga(
                    savePaymentSaga,
                    saveRequest({
                        cardHolder,
                        cardNumber,
                        expiryDate,
                        cvc,
                        token
                    })
                );

                expect(dispatched).toEqual([
                    saveSuccess({
                        cardHolder,
                        cardNumber,
                        expiryDate,
                        cvc
                    })
                ]);
            });

            it("dispatches SAVE_FAILURE if not gets profile", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    savePaymentSaga,
                    saveRequest({})
                );

                expect(dispatched).toEqual([
                    saveFailure(true)
                ]);
            });

            it("dispatches SAVE_FAILURE if catches error", async () => {
                mockApiThrowsError();

                const dispatched = await recordSaga(
                    savePaymentSaga,
                    saveRequest({})
                );

                expect(dispatched).toEqual([
                    saveFailure(new Error("some error occured"))
                ]);
            });
        });

        describe("other actions", () => {
            it("not calls api with unknown action", async () => {
                mockApiFailure();

                const dispatched = await recordSaga(
                    profileRootSaga,
                    mockUnknownAction
                );
    
                expect(serverGetCard).not.toBeCalled();
                expect(serverSaveCard).not.toBeCalled();
                expect(dispatched.length).toEqual(0);
            });
        });
    });
});
