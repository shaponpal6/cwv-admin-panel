import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { withFirebase } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminApp from "./containers/App";
import Auth from "./containers/Auth";
import "./App.css";

function App({ firebase }) {
  console.log("firebase", firebase);
  const [user, loading, error] = useAuthState(firebase.getAuth());
  console.log(user, loading, error);

  // const logout = () => {
  //   firebase.auth().signOut();
  // };

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
      <div>
        {/* <p>Current User: {user.email}</p> */}
        {/* <button onClick={()=>firebase.doSignOut()}>Log out</button> */}
        <Provider store={store}>
          <AdminApp />
        </Provider>
      </div>
    );
  }
  return <Auth />;
}

export default withFirebase(App);
