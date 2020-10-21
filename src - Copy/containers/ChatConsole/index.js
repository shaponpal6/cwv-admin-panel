import React, { useState, PureComponent, Component, renderIntoDocument } from "react";
import ReactDOM from "react-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid'
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";

import { addMessage, setClientID, setMessages } from "../../redux/actions";
import DraftMessageEditor from "../../components/DraftMessageEditor";
import ClientsListContainer from "./ClientsListContainer";
import AsyncClientList from "./AsyncClientList";
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





class CWVChatConsole extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      myChatTabsState: myChatTabs[1].key,
      clientId: '',
      chatUsersList: {}, loading: true, error: false
    };
    // this.componentDidUpdate222()
  }


  // componentDidMount() { }
  componentDidUpdate222() {
    console.log('props', this.props, this.state)
    const [chatUsersList2, chatUsersListLoading, chatUsersListError] = useDocument(
      this.propsfirebase.getListData('chatUsersList'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
    if (!chatUsersListLoading) {
      this.setState(prevState => {
        return { ...prevState, [loading]: false }
      });
    }
    if (chatUsersList2) {
      this.setState(prevState => {
        return { ...prevState, [chatUsersList]: chatUsersListHandler(chatUsersList2, prevState.myChatTabsState) }
      });
    }
    if (chatUsersListError) {
      this.setState(prevState => {
        return { ...prevState, [error]: chatUsersListError }
      });
    }
  }




  /**
     * myChatTabsState Handeler
     * Load Clients by filtering tab key
     * 
     * For Archived read data from differents documeny
     */

  // myChatTabsState onChange Handeler
  onMyChatTabChange = (key) => {
    console.log({ [key]: key });
    this.setState(prevState => {
      return { ...prevState, [myChatTabsState]: key }
    });
  };



  // On User Click
  onChatUserClick = (uid) => {
    console.log('uid', uid)
    this.props.setClientID(uid)
  }

  // Filter User
  chatUsersListHandler = (chatUsersList, type) => {
    if (!chatUsersList.data()) return {};
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
    return {};
  }






  onMessageSave = (replay) => {
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



  render() {
    return (
      <div>
        <Row>
          <Col xs={24} xl={6}>
            <Sider width={"100%"} className="site-layout-background">



              {/* {message.success('Pure Component chat Console ')} */}

              <ClientsListContainer title="Heat" />

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
                actions={[<DraftMessageEditor onMessageSave={this.onMessageSave} />]}
              >


                {/* {this.state.clientId !== "" && <MessagesContainer clientUID={this.state.clientId} />} */}



                {/* <MessagesContainer /> */}
              </Card>
            </Content>
          </Col>
          <Col xs={24} xl={8}>
            <Sider width={"100%"} className="site-layout-background">

              {/* <ClientDetailsComponent /> */}

            </Sider>
          </Col>

        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  ...state,
  myChatTabsState: myChatTabs[1].key,
  clientId: ''
})

// export default connect(mapStateToProps, { setClientID, addMessage })(withFirebase(CWVChatConsole))
export default CWVChatConsole;
