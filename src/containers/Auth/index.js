import React from "react";
import { withFirebase } from "../../firebase";

import "./style.css";

function index({ firebase }) {

  return (
    <div className="wpcwv-authPage">
      <div className="wpcwv-authBox">
        <h1>CWV Chat</h1>
        <p>Card content</p>
        <button className="wpcwv-signInBTN" onClick={() => firebase.doSignInWithGoogle()}>
          Login 
        </button>
      </div>
    </div>
  );
}

export default withFirebase(index);
