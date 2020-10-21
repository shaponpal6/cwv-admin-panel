import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../../firebase";
import RSC from "react-scrollbars-custom";
import { setClientID } from "../../../redux/actions";
import Loading from "../../../components/Loading";
import UserConponent from "../../../components/UserConponent";
import { myChatTabs } from '../../../constants'
import { Card, message } from "antd";
import "./style.css";

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";



function ChatUsersList({ firebase }) {
    const dispatch = useDispatch();

    /**
     * myChatTabsState Handeler
     * Load Clients by filtering tab key
     * 
     * For Archived read data from differents documeny
     */
    const [myChatTabsState, setMyChatTabsState] = useState('');

    useEffect(() => {
        setMyChatTabsState(myChatTabs[1].key)
        return () => {

        }
    }, [])

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

    return (

        <>

            <Card
                style={{ width: "100%", height: "75vh" }}
                bodyStyle={{ overflow: "auto", height: "100%", padding: "0" }}
                tabList={myChatTabs}
                loading={false}
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


        </>


    )
}

export default withFirebase(ChatUsersList)
