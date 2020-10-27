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
            <div className="cwv-send" title="Send">
                <button className="cwv-buttonRoot cwv-button" tabIndex="-1" type="button" mini="true" aria-label="send"
                    disabled="">
                    <span className="cwv-buttonLabel">
                        <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </span>
                </button>
            </div>

        </footer>
    )
}

const mapStateToProps = (state) => ({
    clientId: state.chatConsole.clientId
});

export default connect(mapStateToProps, {})(withFirebase((Footer)))




