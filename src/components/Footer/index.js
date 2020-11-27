import React from 'react'
import { connect, useDispatch } from "react-redux";
import uniqid from 'uniqid'
import DraftEditor from "../DraftEditor";
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
            time: new Date().toISOString(),
        }
        console.log('message', message)

        firebase.setMessages(clientId, message);
        dispatch(addMessage(message));
    };

    const styles = {
        root: {},
        editor: {
            cursor: "text",
            padding: 10,
            minHeight: 55,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    };

    const button = {
        load: true,
        title: 'SEND',
        icon: 'send',
        containerClass: '',
        className: 'cwv-btnMessageSend',
        style: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%'
        }
    };

    return (
        <footer className="cwv-chatFooter">
            <div className="cwv-inputWraper">
                {/* <input className="cwv-textarea" placeholder="Type a message" type="text" /> */}
                <DraftEditor className="" placeholder="Enter Your Replay..." onSubmitHandler={onMessageSave} styles={styles} button={button} />
            </div>


        </footer>
    )
}

const mapStateToProps = (state) => ({
    clientId: state.chatConsole.clientId
});

export default connect(mapStateToProps, {})(withFirebase((Footer)))




