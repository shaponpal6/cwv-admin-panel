import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid'
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";

import { addMessage, setClientID, setMessages } from "../../redux/actions";
import DraftMessageEditor from "../../components/DraftMessageEditor";
// import ClientsListContainer from "./ClientsListContainer";
import MessagesContainer from "../../components/MessagesContainer";
import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import { Layout, Card, Row, Col, message } from "antd";
import RSC from "react-scrollbars-custom";
import Loading from "../../components/Loading";

import UserConponent from "../../components/UserConponent";
import { myChatTabs } from '../../constants'
import "./style.css";



import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";



const { Content, Sider } = Layout;



const ChatApp = ({ firebase }) => {

  /**
     * myChatTabsState Handeler
     * Load Clients by filtering tab key
     * 
     * For Archived read data from differents documeny
     */
  const [myChatTabsState, setMyChatTabsState] = useState(myChatTabs[1].key);
  console.log('myChatTabsState', myChatTabsState)

  // myChatTabsState onChange Handeler
  const onMyChatTabChange = (key) => {
    console.log({ [key]: key });
    setMyChatTabsState(key);
  };


  const [chatUsersList, chatUsersListLoading, chatUsersListError] = useDocument(
    firebase.getListData('chatUsersList'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // On User Click
  const onChatUserClick = (uid) => {
    console.log('uid', uid)
    dispatch(setClientID(uid))
  }

  // Filter User
  const chatUsersListHandler = (chatUsersList, type) => {
    if (!chatUsersList.data()) return null;
    const clients = chatUsersList.data();
    if (typeof clients.users === 'object' && clients.users !== null) {
      if (type !== "all" && myChatTabs.map(a => a.key).includes(type)) {
        const raw = clients.users;
        return Object.keys(raw)
          .filter(key => (raw[key].hasOwnProperty('type') && raw[key].type === type))
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: raw[key]
            };
          }, {});
      }

      return clients.users;
    }
    return null;
  }

  // ............................................................
  const { clientId } = useSelector((state) => state.chatConsole);
  const dispatch = useDispatch();




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

            {/* Todo */}
            {chatUsersListError && message.error(JSON.stringify(chatUsersListError))}
            {chatUsersListLoading && <Loading type="userList" />}


            {message.success('Chat List Randered')}

            <RSC className="wpcwv-clientListScrollbar" id="wpcwv-clientListScrollbar" style={{ width: "100%", height: "100%", padding: "10px" }} momentum={true} maximalThumbYSize={10} >

              {(chatUsersList && chatUsersListHandler(chatUsersList, myChatTabsState)) &&
                (Object.entries(chatUsersListHandler(chatUsersList, myChatTabsState)).map((user, index) => {
                  console.log('user', user, index)
                  return (
                    <Card hoverable style={{ width: "100%" }} bodyStyle={{ padding: "10px" }} key={'cwvclient-' + index}>
                      <UserConponent user={user} onClick={() => onChatUserClick(user[0])} />
                    </Card>
                  );
                }))
              }
            </RSC>

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
