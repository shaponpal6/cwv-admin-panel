import React, { PureComponent } from "react";
import ClientsListContainer from "./ClientsListContainer";
import AsyncClientData from "./AsyncClientData";
import MessagesContainer from "../../components/MessagesContainer";
import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import Footer from "../../components/Footer";
import { Layout, Card, Row, Col } from "antd";
import "./style.css";
const { Content, Sider } = Layout;



class CWVChatConsole extends PureComponent {

  render() {
    return (
      <div>
        <Row>
          <Col xs={24} xl={6}>
            <Sider width={"100%"} className="site-layout-background">
              <ClientsListContainer />
            </Sider>
          </Col>
          <Col xs={24} xl={10}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Card
                style={{ width: "100%", height: "92vh", textAlign: "left" }}
                bodyStyle={{ overflow: "auto", height: "100%", padding: "0" }}
                title={'Client Name'}
                tabBarExtraContent={<span>Setting</span>}
              >
                <div className="wpcwv-messageBody">
                  <AsyncClientData />
                  <MessagesContainer />
                  <Footer />
                </div>

              </Card>
            </Content>
          </Col>
          <Col xs={24} xl={8}>
            <Sider width={"100%"} className="site-layout-background">
              <ClientDetailsComponent />
            </Sider>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CWVChatConsole;
