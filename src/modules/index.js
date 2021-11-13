import { combineReducers } from "redux";
import user from "./user";
import profile from "./profile";
import route from "./route";
import { reducer as form } from "redux-form";

export default combineReducers({
    user,
    profile,
    route,
    form
});
