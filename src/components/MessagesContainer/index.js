import React, { memo } from 'react'
import { connect } from "react-redux";
import {makeTime} from '../../functions/time'
// import './style.css'


function MessagesContainer({ messages }) {

    console.log('messages Container', messages)

    return (
        <ul className="cwv-messages">
            {messages && messages.length
                ? messages.map((message, index) => {
                    return (
                        <li className="cwv-message" key={message.key}>
                            <time dateTime={message.time}>{makeTime(message.time, 'MMM d, yy h:mm a')}</time>
                            <div className="cwv-listAvatar">
                                <img alt="avatar" src="https://randomuser.me/api/portraits/men/40.jpg" className="cwv-listAvatarImg" />
                            </div>
                            <div className="cwv-text">
                                <p><span>{message.text}</span></p>
                            </div>
                        </li>
                    );
                })
                : "No Messages!"}
        </ul>
    )
}

const mapStateToProps = (state) => ({
    messages: state.chatConsole.messages
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(MessagesContainer)))
