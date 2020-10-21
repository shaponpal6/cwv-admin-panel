import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";
import RSC from "react-scrollbars-custom";
import { setClientID } from "../../redux/actions";
import { Card, Avatar } from "antd";
import Loading from "../Loading";
import './style.css'


function ChatUsersList({ firebase, myChatTabsState }) {

    // const { clientId } = useSelector((state) => state.chatConsole);
    const dispatch = useDispatch();


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
            return clients.users;
        }
        return null;
    }

    return (
        <>

            {/* Todo */}
            {chatUsersListError && <strong>Error: {JSON.stringify(chatUsersListError)}</strong>}
            {chatUsersListLoading && <Loading />}

            {/* <RSC className="wpcwv-clientListScrollbar" id="wpcwv-clientListScrollbar" style={{ width: "100%", height: "100%", padding: "10px" }} momentum={true} maximalThumbYSize={10} > */}

            {(chatUsersList && chatUsersListHandler(chatUsersList, myChatTabsState)) &&
                (Object.entries(chatUsersListHandler(chatUsersList, myChatTabsState)).map((user, index) => {
                    console.log('user', user, index)
                    return (
                        <Card hoverable style={{ width: "100%" }} bodyStyle={{ padding: "10px" }} key={'cwvclient-' + index}>
                            <div className="wpcwv-clientList" onClick={() => onChatUserClick(user[0])}>
                                <div className="wpcwv-cardAvatar">
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </div>
                                <div className="wpcwv-cardDetail">
                                    <div className="wpcwv-cardDetailTop">
                                        <div className="wpcwv-clientName wpcwv-textEllipsis">{user[1].name ?? 'Anonymous'}</div>
                                        <div className="wpcwv-clientSeen wpcwv-textEllipsis">11 mins ago</div>
                                    </div>
                                    <div className="wpcwv-cardDetailBottom">
                                        <div className="wpcwv-clientMessage wpcwv-textEllipsis">This is message</div>
                                        <div className="wpcwv-clientStatus">online</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                }))
            }

            {/* </RSC> */}
        </>
    )
}

export default withFirebase(ChatUsersList)
