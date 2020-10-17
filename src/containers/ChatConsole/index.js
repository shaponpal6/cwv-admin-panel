import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid'
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";

import { addMessage, setClientID, setMessages } from "../../redux/actions";
import DraftMessageEditor from "../../components/DraftMessageEditor";
import UserConponent from "../../components/UserConponent";
import ChatUsersList from "../../components/ChatUsersList";
import MessagesContainer from "../../components/MessagesContainer";
import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import { myChatTabs } from '../../constants'
import { Layout, Card, Row, Col } from "antd";

import "./style.css";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import Loading from "../../components/Loading";


const { Content, Sider } = Layout;

const ChatApp = ({ firebase }) => {
  const { clientId } = useSelector((state) => state.chatConsole);
  const dispatch = useDispatch();

  const [chatUsersList, chatUsersListLoading, chatUsersListError] = useDocument(
    firebase.getListData('chatUsersList'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );



  /**
   * myChatTabsState Handeler
   * Load Clients by filtering tab key
   * 
   * For Archived read data from differents documeny
   */
  const [myChatTabsState, setMyChatTabsState] = useState(myChatTabs[1].key);

  // myChatTabsState onChange Handeler
  const onMyChatTabChange = (key) => {
    console.log({ [key]: key });
    setMyChatTabsState(key);
  };



  const onMessageSave = (replay) => {
    const { uid, displayName, photoURL } = firebase.getCurrentUser();
    const message = {
      key: uniqid('sp'),
      text: replay,
      type: 'admin',
      status: 0,
      senderID: uid,
      name: displayName,
      photoURL: photoURL,
      time: 'ss',
    }


    // const uid2 = '7ghkuJPNoOg7xp0V08ag';
    const uid4 = clientId;
    // const uid3 = uniqid('sp');
    firebase.setMessages(uid4, message);
    // const addMessageToFirebase2 = firebase.updateUserListMap(uid3,  {name:message.text, uid: uid3, type:"onChat"});
    dispatch(addMessage(message));
  };


  const onChatUserClick = (clientID) => {
    dispatch(setClientID(clientID));
    dispatch(setMessages(''));
  };

  function ChatUsersListHandler(chatUsersList, type) {
    if (!chatUsersList.data()) return;
    const clients = chatUsersList.data();
    if (typeof clients.users === 'object' && clients.users !== null) {
      Object.entries(clients.users).map((user, index) => {
        console.log('user', user, index, type)
        return (
          <UserConponent
            key={'cwvclient-' + index}
            onClick={() => onChatUserClick(user[0])}
            user={user[1]}
          />
        );
      })
    }
  };

  return (
    <Row>
      <Col xs={24} xl={6}>
        <Sider width={"100%"} className="site-layout-background">
          <Card
            style={{ width: "100%", height: "75vh" }}
            bodyStyle={{ overflow: "auto", height: "100%", padding: "0" }}
            tabList={myChatTabs}
            activeTabKey={myChatTabsState}
            tabBarExtraContent={<SettingOutlined key="setting" />}
            onTabChange={(key) => onMyChatTabChange(key)}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >

            <ChatUsersList myChatTabsState={myChatTabsState} />
            {/* {chatUsersListError && <strong>Error: {JSON.stringify(chatUsersListError)}</strong>} */}
            {/* {chatUsersListLoading && <Loading />} */}

            {/* {chatUsersList && chatUsersListHandler(chatUsersList, myChatTabsState)} */}



            {/* {myChatTabsState} */}
          </Card>
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
            style={{ width: "100%", height: "75vh", textAlign: "left" }}
            bodyStyle={{ overflow: "auto", height: "100%", padding: "0" }}
            actionsStyle={{ height: "200px" }}
            headStyle={{ width: "100%" }}
            cardStyle={{ width: "100%" }}
            title={'Client Name'}
            tabBarExtraContent={<span>Setting</span>}
            actions={[<DraftMessageEditor onMessageSave={onMessageSave} />]}
          >


            {clientId !== "" && <MessagesContainer clientUID={clientId} />}



            {/* <MessagesContainer /> */}
          </Card>
        </Content>
      </Col>
      <Col xs={24} xl={8}>
        <Sider width={"100%"} className="site-layout-background">

          <ClientDetailsComponent />

        </Sider>
      </Col>

    </Row>
  );
};

export default withFirebase(ChatApp);
