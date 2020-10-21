import React, { useState, useEffect, memo } from 'react'
import { connect, useDispatch } from "react-redux";
import { useDocument } from 'react-firebase-hooks/firestore';
import uniqid from 'uniqid'
import DraftMessageEditor from "../DraftMessageEditor";
import { addMessage, setMessages, setShortNotes, setOperators } from "../../redux/actions";
import { FirebaseContext, withFirebase } from "../../firebase";
import './style.css'


export const Footer = ({ firebase, clientId }) => {

    const dispatch = useDispatch();

    const onMessageSave = (replay) => {
        if (!clientId) return;
        const { uid, displayName, photoURL } = firebase.getCurrentUser();
        const message = {
            key: uniqid('sp'),
            text: replay,
            type: 'admin',
            status: 0,
            senderID: uid,
            name: displayName,
            photoURL: photoURL,
            time: Date.now(),
        }
        console.log('message', message)

        firebase.setMessages(clientId, message);
        dispatch(addMessage(message));
    };

    return (
        <div className="wpcwv-footerContainer">
            <DraftMessageEditor onMessageSave={onMessageSave} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    clientId: state.chatConsole.clientId
});

export default connect(mapStateToProps, {})(withFirebase((Footer)))




