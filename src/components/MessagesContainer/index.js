import React, { memo } from 'react'
import { connect } from "react-redux";
import './style.css'

import MessageConponent from "../MessageConponent";

function MessagesContainer({ messages }) {

    console.log('messages Container', messages)

    return (
        <div>
            {messages && messages.length
                ? messages.map((message, index) => {
                    return (
                        <MessageConponent
                            key={message.key}
                            message={message}
                        />
                    );
                })
                : "No Messages!"}
        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.chatConsole.messages
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)((memo(MessagesContainer)))
// export default (MessagesContainer)

