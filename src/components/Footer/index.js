import React from 'react'
import { connect, useDispatch } from "react-redux";
import uniqid from 'uniqid'
import DraftMessageEditor from "../DraftMessageEditor";
import { addMessage } from "../../redux/actions";
import { withFirebase } from "../../firebase";
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
        <footer className="cwv-chatFooter">
            <div className="cwv-inputWraper">
                {/* <input className="cwv-textarea" placeholder="Type a message" type="text" /> */}
                <DraftMessageEditor onMessageSave={onMessageSave} />
            </div>


        </footer>
    )
}

const mapStateToProps = (state) => ({
    clientId: state.chatConsole.clientId
});

export default connect(mapStateToProps, {})(withFirebase((Footer)))




