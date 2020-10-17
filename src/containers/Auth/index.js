import React from "react";
import { Card, Button } from "antd";
// import { useAuthState } from "react-firebase-hooks/auth";
import { withFirebase } from "../../firebase";

import "./style.css";

function index({firebase}) {

  // const login = () => {
  //   firebase.doSignInWithGoogle();
  // };

  return (
    <div className="wpcwv-authPage">
      <Card style={{ width: '30%', textAlign: 'center' }}>
        <p>SP Assistant</p>
        <p>Card content</p>
        <Button type="primary" key="console" onClick={() => firebase.doSignInWithGoogle()}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default withFirebase(index);
