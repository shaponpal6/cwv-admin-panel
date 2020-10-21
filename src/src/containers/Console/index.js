import React, { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { setMenuState } from "../../store/redux/actions";
import { Layout, Card, Menu, Row, Col } from "antd";
// import Dashboard from '../Dashboard';
// import ChatConsole from '../ChatConsole';
// import KnowledgeBase from '../KnowledgeBase';

// import ChatUsersList from "../../components/ChatUsersList";
// import MessagesContainer from "../../components/MessagesContainer";
// import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import { myChatTabs } from '../../store/constants'

import ClientsList from "./ClientsList";

import "./style.css";

// import Todos from '../../Todos'
// import NewTodo from '../../NewTodo'
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";
// import Loading from "../../components/Loading";


const { Content, Sider } = Layout;

class CWVConsole extends PureComponent {



    // Chat Button Open / Close
    onMenuClick = (e) => {
        console.log(e.key);
        this.props.setMenuState(e.key);
    };


    render() {

        return (
            <div id="wpcwv-adminContainer">

                <Row>
                    <Col xs={24} xl={6}>
                        <Sider width={"100%"} className="site-layout-background">
                            {/* <ClientsList /> */}
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
                                actions={[
                                    // <DraftMessageEditor onMessageSave={onMessageSave} />
                                ]}
                            >


                                {/* {clientId !== "" && <MessagesContainer clientUID={clientId} />} */}



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
        )
    }
}

const mapStateToProps = (state) => ({
    chatRoute: state.menus.chatRoute
})

export default connect(mapStateToProps, { setMenuState })(CWVConsole)
