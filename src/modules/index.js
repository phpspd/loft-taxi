import { combineReducers } from "redux";
import user from "./user";
import profile from "./profile";
import route from "./route";

export default combineReducers({
    user,
    profile,
    route
});
