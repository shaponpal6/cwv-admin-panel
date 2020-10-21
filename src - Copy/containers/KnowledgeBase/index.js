import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKnowledge } from "../../redux/actions";
import Table from "../../components/Table";
import AddKnowledgeBaseForm from "../../components/AddKnowledgeBaseForm";
import { Layout, Menu, Row, Col } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import "./style.css";

const { Sider } = Layout;

const KnowledgeBaseComponent = () => {
  const messages = useSelector(state => state.knowledgeBase.knowledges);
  const dispatch = useDispatch();


  const onUserClick = (key, type) => {
    console.log(key, type);
    // setTabState({ [type]: key });
  };

  const onKnowledgeAdded = (data) => {
    console.log("data22", data);
    dispatch(addKnowledge(data));
  };

  return (
    <Row>
      <Col xs={24} xl={4}>
        <Sider width={'100%'} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              icon={<UserOutlined />}
              key="1"
              onClick={(key) => {
                onUserClick(key, "noTitleKey");
              }}
            >
              Knowledge Base
            </Menu.Item>

            <Menu.Item
              icon={<LaptopOutlined />}
              key="2"
              onClick={(key) => {
                onUserClick(key, "noTitleKey");
              }}
            >
              Small Talk
            </Menu.Item>

            <Menu.Item
              icon={<NotificationOutlined />}
              key="3"
              onClick={(key) => {
                onUserClick(key, "noTitleKey");
              }}
            >
              Event Talk
            </Menu.Item>
            <Menu.Item
              icon={<NotificationOutlined />}
              key="4"
              onClick={(key) => {
                onUserClick(key, "noTitleKey");
              }}
            >
              Trainning
            </Menu.Item>
            <Menu.Item
              icon={<NotificationOutlined />}
              key="5"
              onClick={(key) => {
                onUserClick(key, "noTitleKey");
              }}
            >
              System Constant
            </Menu.Item>
          </Menu>
        </Sider>
      </Col>

      <Col xs={24} xl={20}>
        <AddKnowledgeBaseForm handleSubmitOnClick={onKnowledgeAdded} />
        <Table list={messages} />
      </Col>
    </Row>
  );
};

export default KnowledgeBaseComponent
