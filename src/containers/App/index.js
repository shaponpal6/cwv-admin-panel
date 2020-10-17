import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setMenuState } from "../../redux/actions";
// import { APP_ROUTE } from "../../constants";
import { Menu, Row, Col } from "antd";

// import { AppContext } from "../../store";

import Dashboard from '../Dashboard';
import ChatConsole from '../ChatConsole';
import KnowledgeBase from '../KnowledgeBase';


import 'antd/dist/antd.css';
import "./style.css";



const ChatApp = ({ chatRoute, setMenuState }) => {
  const state = { chatRoute: "console" };


  useEffect(function () {
    console.log('state', state)
  }, [state])

  // Chat Button Open / Close
  const onMenuClick = (e) => {
    console.log(e.key);
    setMenuState(e.key);
  };

  return (
    <div id="wpcwv-adminContainer">

      <Row>
        <Col flex="100px">Simple ChatApp</Col>
        <Col flex="auto">

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[chatRoute]}>
            <Menu.Item key="dashboard" onClick={onMenuClick}>Dashboard</Menu.Item>
            <Menu.Item key="console" onClick={onMenuClick}>Console</Menu.Item>
            <Menu.Item key="knowledgebase" onClick={onMenuClick}>Knowledge Base</Menu.Item>
          </Menu>
        </Col>
        <Col flex="100px">BTN</Col>
      </Row>

      {chatRoute === "dashboard" && <Dashboard />}
      {chatRoute === "console" && <ChatConsole />}
      {chatRoute === "knowledgebase" && <KnowledgeBase />}

    </div>
  );
};


const mapStateToProps = state => {
  console.log(state)
  return { chatRoute: state.menus.chatRoute };
};
// export default VisibilityFilters;
export default connect(
  mapStateToProps,
  { setMenuState }
)(ChatApp);
