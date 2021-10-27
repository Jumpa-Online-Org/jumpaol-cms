import { combineReducers } from "redux";
import postReducer from "./postReducer";
import sidebarReducer from "./sidebarReducer"

export default combineReducers({
  postReducer,
  sidebarReducer
})
