import React from "react";
import { withFirebase } from "../../firebase";

import "./style.css";

function index({ firebase }) {

  return (
    <div className="wpcwv-authPage">
      <div style={{ width: '30%', textAlign: 'center' }}>
        <p>SP Assistant</p>
        <p>Card content</p>
        <button type="primary" key="console" onClick={() => firebase.doSignInWithGoogle()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default withFirebase(index);
