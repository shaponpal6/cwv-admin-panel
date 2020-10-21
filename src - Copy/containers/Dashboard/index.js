import React from "react";
import { Layout } from "antd";

import "./style.css";

const {  Content } = Layout;

const ChatApp = () => {
 

  return (
    <div className="wpcwv-dashboard">

      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Dashboard
        </Content>
      </Layout>
    </div>
  );
};

export default ChatApp;
