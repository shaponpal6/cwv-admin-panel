import React, { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { firestoreConnect, withFirestore, useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import RSC from "react-scrollbars-custom";
import { compose, withHandlers, lifecycle } from 'recompose'
// import { setClientID } from "../../../store/redux/actions";
import Loading from "../../components/Loading";
// import UserConponent from "../../../components/UserConponent";
import { myChatTabs } from '../../store/constants'
import { Card, message } from "antd";
import "./style.css";

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import TodoItem from '../../TodoItem'

// const todosQuery = {
//     collection: 'todos',
//     limitTo: 10
// }
// const listQuery = {
//     collection: 'lists',
//     doc: 'chatUsersList'
// }

function ClientsList() {



    /**
     * myChatTabsState Handeler
     * Load Clients by filtering tab key
     * 
     * For Archived read data from differents documeny
     */
    const [myChatTabsState, setMyChatTabsState] = useState('');

    // myChatTabsState onChange Handeler
    const onMyChatTabChange = (key) => {
        console.log({ [key]: key });
        setMyChatTabsState(key);
    };


    // On User Click
    const onChatUserClick = (uid) => {
        console.log('uid', uid)
        // dispatch(setClientID(uid))
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

    // Show a message while todos are loading
    if (!isLoaded(todos)) {
        return <Loading type="userList" />
    }

    // Show a message if there are no todos
    if (isEmpty(todos)) {
        return 'Todo list is empty'
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







                <RSC className="wpcwv-clientListScrollbar" id="wpcwv-clientListScrollbar" style={{ width: "100%", height: "100%", padding: "10px" }} momentum={true} maximalThumbYSize={10} >

                    {/* {todos.map(({ id, ...todo }, ind) => (
                        <TodoItem key={`${id}-${ind}`} id={id} {...todo} />
                    ))} */}

                    {/* {(chatUsersList && chatUsersListHandler(chatUsersList, myChatTabsState)) &&
                        (Object.entries(chatUsersListHandler(chatUsersList, myChatTabsState)).map((user, index) => {
                            console.log('user', user, index)
                            return (
                                <Card hoverable style={{ width: "100%" }} bodyStyle={{ padding: "10px" }} key={'cwvclient-' + index}>
                                    <UserConponent user={user} onClick={() => onChatUserClick(user[0])} />
                                </Card>
                            );
                        }))
                    } */}
                </RSC>

            </Card>
        </>
    )
}


export default ClientsList
