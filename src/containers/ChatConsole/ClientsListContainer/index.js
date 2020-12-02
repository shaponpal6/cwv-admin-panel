import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../../firebase";
import RSC from "react-scrollbars-custom";
import { setClientID } from "../../../redux/actions";
import Loading from "../../../components/Loading";
import UserConponent from "../../../components/UserConponent";
import { myChatTabs } from '../../../constants'
// import "./style.css";




function ChatUsersList({ firebase, setClientId }) {
    const dispatch = useDispatch();

    const [myChatTabsState, setMyChatTabsState] = useState(myChatTabs[1].key);
    const [myChatList, filterChatUsersList] = useState({});
    const [filter, setFilter] = useState({type: '', action: ""});
    const [search, setSearch] = useState('');



    // myChatTabsState onChange Handeler
    const onChatTabChange = (key) => {
        setFilter({type: 'chatType', action: key});
        //setSearch('');
    };


    const [chatUsersList, chatUsersListLoading, chatUsersListError] = useDocument(
        firebase.getListData('chatUsersList'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

   

    useEffect(() => {
        setFilter({type: 'search', action: search});
    }, [search]);


    useEffect(() => {
        if(chatUsersList && chatUsersList.data()){
            filterChatUsersList(chatUsersListHandler(chatUsersList));
        }
        return () => {     
            // Unregister hook      
        }
    }, [chatUsersListLoading, filter]);


    // On User Click
    const onChatUserClick = (uid) => {
        console.log('uid', uid)
        setClientId(uid);
        dispatch(setClientID(uid))
    }

    // Filter User
    const chatUsersListHandler = (chatUsersList) => {
        if (!chatUsersList.data()) return {};
        const clients = chatUsersList.data();
        if (typeof clients.users === 'object' && clients.users !== null) {
            const raw = clients.users;
            console.log('filter', filter)
            if (filter.type === "chatType" && filter.action !== "") {
                return Object.keys(raw)
                    .filter(key => (raw[key].hasOwnProperty('type') && raw[key].type === filter.action))
                    .reduce((obj, key) => {
                        return {
                            ...obj,
                            [key]: raw[key]
                        };
                    }, {});
            }
            if (filter.type === "search" && filter.action !== "") {
                return Object.keys(raw)
                    .filter(key => (raw[key].hasOwnProperty('name') && raw[key].name.toLowerCase().indexOf(filter.action.toLowerCase()) > -1 ))
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


    return (
        <>
            <div className="cwv-searchWraper">
                <div className="cwv-clientSearch">
                    <div className="cwv-searchIcon">
                        <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                            </path>
                        </svg>
                    </div>
                    <input className="cwv-searchBar" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
            </div>
            <div className="cwv-clientsCount">{chatUsersList && Object.entries(myChatList).length}&nbsp; Contacts</div>
            
            <RSC className="wpcwv-clientListScrollbar" id="wpcwv-clientListScrollbar" style={{ width: "100%", height: "100%", padding: "10px" }} momentum={true} maximalThumbYSize={10} >

                <ul className="cwv-clientsList">
                    {chatUsersListLoading && <Loading />}
                    {/* {(chatUsersList && chatUsersListHandler(chatUsersList, myChatTabsState)) && */}
                    {myChatList && (Object.entries(myChatList).map((user, index) => {
                            return (
                                <UserConponent key={'cwvClient-' + index} user={user} onClick={() => onChatUserClick(user[0])} />
                            );
                        }))
                    }
                </ul>

            </RSC>


            <div className="cwv-consoleFooterAction">
                <button className="cwv-buttonRoot cwv-button cwv-actionButton" type="button" onClick={() => onChatTabChange('open')}>
                    <span className="MuiBottomNavigationAction-wrapper">
                        <svg className="cwv-SvgIconRoot" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z">
                            </path>
                        </svg>
                        <span
                            className="MuiBottomNavigationAction-label MuiBottomNavigationAction-iconOnly">Open</span></span><span
                                className="cwv-touchRipple"></span>
                </button>
                <button className="cwv-buttonRoot cwv-button cwv-actionButton" type="button" onClick={() => onChatTabChange('archived')}>
                    <span className="MuiBottomNavigationAction-wrapper">
                        <svg className="cwv-SvgIconRoot" focusable="false"
                            viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                            </path>
                        </svg>
                        <span className="MuiBottomNavigationAction-label Mui-selected">Archived</span></span><span
                            className="cwv-touchRipple"></span>
                </button>
            </div>
        </>
    )
}

export default withFirebase(ChatUsersList)
