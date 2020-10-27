import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { withFirebase } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminApp from "./containers/App";
import Auth from "./containers/Auth";

// Style
import "./utils/preset.css"
import "./utils/button.css"
import "./utils/popup.css"
import "./utils/console.css"
import "./utils/style.css"
import "./utils/media.css"


function App({ firebase }) {
  const [user, loading, error] = useAuthState(firebase.getAuth());
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (

      <Provider store={store}>
        <AdminApp />
      </Provider>

    );
  }
  return <Auth />;
}

export default withFirebase(App);
