import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import menus from "./menus";
import chatConsole from "./chatConsole";
import knowledgeBase from "./knowledgeBase";


export default combineReducers({ todos, visibilityFilter, menus, chatConsole, knowledgeBase });
