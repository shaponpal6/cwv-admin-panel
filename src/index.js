import React from "react";
import ReactDOM from "react-dom";
import Firebase, { FirebaseContext } from "./firebase";
import App from './App'
// import NewApp from './src/App'
import "./index.css";

import * as serviceWorker from "./serviceWorker";




ReactDOM.render(
    <div>
        {/* <NewApp /> */}
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>

    </div>,
    document.getElementById("wpcwv-adminPanel")
);

serviceWorker.unregister();
