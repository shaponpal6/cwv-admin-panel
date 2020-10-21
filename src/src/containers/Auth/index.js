import React from "react";
import { Card, Button } from "antd";
import { useFirebase } from 'react-redux-firebase'

import "./style.css";

function LoginPage() {

  const firebase = useFirebase()

  function loginWithGoogle() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }

  return (
    <div className="wpcwv-authPage">
      <Card style={{ width: '30%', textAlign: 'center' }}>
        <p>SP Assistant</p>
        <p>Card content</p>
        <Button type="primary" key="console" onClick={loginWithGoogle}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export default LoginPage;
