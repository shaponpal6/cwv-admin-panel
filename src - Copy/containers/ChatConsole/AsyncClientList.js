import React, { useState, PureComponent, Component, renderIntoDocument } from "react";
import ReactDOM from "react-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import uniqid from 'uniqid'
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";

import { addMessage, setClientID, setMessages } from "../../redux/actions";
import DraftMessageEditor from "../../components/DraftMessageEditor";
import ClientsListContainer from "./ClientsListContainer";
// import AsyncClientList from "./AsyncClientList";
import MessagesContainer from "../../components/MessagesContainer";
import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import { Layout, Card, Row, Col, message } from "antd";
import RSC from "react-scrollbars-custom";
import Loading from "../../components/Loading";

import UserConponent from "../../components/UserConponent";
import { myChatTabs } from '../../constants'
import "./style.css";


class AsyncClientList extends Component {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         myChatTabsState: myChatTabs[1].key,
    //         clientId: '',
    //         chatUsersList: {}, loading: true, error: false
    //     };
    // }


    // // componentDidMount() { }
    // componentDidMount() {
    //     console.log('props', this.props, this.state)
    //     const [chatUsersList2, chatUsersListLoading, chatUsersListError] = useDocument(
    //         this.props.firebase.getListData('chatUsersList'),
    //         {
    //             snapshotListenOptions: { includeMetadataChanges: true },
    //         }
    //     );
    //     if (!chatUsersListLoading) {
    //         this.setState(prevState => {
    //             return { ...prevState, [loading]: false }
    //         });
    //     }
    //     if (chatUsersList2) {
    //         this.setState(prevState => {
    //             return { ...prevState, [chatUsersList]: chatUsersListHandler(chatUsersList2, prevState.myChatTabsState) }
    //         });
    //     }
    //     if (chatUsersListError) {
    //         this.setState(prevState => {
    //             return { ...prevState, [error]: chatUsersListError }
    //         });
    //     }
    // }



    render() {
        return (
            <div>
                HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
            </div>
        )
    }
}

export default (AsyncClientList)
