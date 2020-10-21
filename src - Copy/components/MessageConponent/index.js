import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from "antd";

import "./style.css";


const { Meta } = Card;



function MessageComponent({ message }) {
  return (
    <div>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={message.text}
        description={message.time}
      />

    </div>
  )
}

MessageComponent.propTypes = {
  message: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['admin', 'client']).isRequired,
    status: PropTypes.number.isRequired,
    senderID: PropTypes.string.isRequired,
    name: PropTypes.string,
    photoURL: PropTypes.string,
    time: PropTypes.any.isRequired,
  })

}

export default MessageComponent

