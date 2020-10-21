import React, { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { setMenuState } from "../../redux/actions";
import { Menu, Row, Col } from "antd";
import Dashboard from '../Dashboard';
import ChatConsole from '../ChatConsole';
import KnowledgeBase from '../KnowledgeBase';
import 'antd/dist/antd.css';
import "./style.css";


class CWVAPPRoot extends PureComponent {



  // Chat Button Open / Close
  onMenuClick = (e) => {
    console.log(e.key);
    this.props.setMenuState(e.key);
  };


  render() {

    return (
      <div id="wpcwv-adminContainer">

        <Row>
          <Col flex="100px">Simple ChatApp</Col>
          <Col flex="auto">

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.chatRoute]}>
              <Menu.Item key="dashboard" onClick={this.onMenuClick}>Dashboard</Menu.Item>
              <Menu.Item key="console" onClick={this.onMenuClick}>Console</Menu.Item>
              <Menu.Item key="knowledgebase" onClick={this.onMenuClick}>Knowledge Base</Menu.Item>
            </Menu>
          </Col>
          <Col flex="100px">BTN</Col>
        </Row>


        {this.props.chatRoute === "dashboard" && <Dashboard />}
        {this.props.chatRoute === "console" && <ChatConsole />}
        {this.props.chatRoute === "knowledgebase" && <KnowledgeBase />}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  chatRoute: state.menus.chatRoute
})

export default connect(mapStateToProps, { setMenuState })(memo(CWVAPPRoot))
