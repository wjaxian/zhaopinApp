import { combineReducers } from "redux";
import { user } from "./redux/user.redux";
import { listData } from "./redux/list.redux";
import { chat } from "./redux/chat.redux";

export default combineReducers({
    user,
    listData,
    chat
});