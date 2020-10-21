import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import menus from "./menus";
import chatConsole from "./chatConsole";
import knowledgeBase from "./knowledgeBase";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    chatConsole: chatConsole,
    knowledgeBase: knowledgeBase,
    menus: menus
})

export default rootReducer

