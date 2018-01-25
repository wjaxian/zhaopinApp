import { combineReducers } from "redux";
import { user } from "./redux/user.redux";
import { listData } from "./redux/list.redux";

export default combineReducers({
    user,
    listData
});