import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from "antd";

import "./style.css";


const { Meta } = Card;



function MessageComponent(props) {
    return (
        <div>
            <Meta
                      key={`todo-${message.id}`}
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={message.text}
                      description="This is the description"
                    />
            
        </div>
    )
}

MessageComponent.propTypes = {
    message: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        senderID: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })).isRequired,

}

export default MessageComponent

