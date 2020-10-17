import React from 'react'
// import PropTypes from 'prop-types'
import { Card, Avatar } from "antd";

import "./style.css";


const { Meta } = Card;



function UserComponent({ user, onClick }) {
  return (
    <Card hoverable style={{ width: "100%" }} bodyStyle={{ padding: "10px" }}>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={user.name}
        uid={user.uid}
        onClick={onClick}
      // description="This is the description"

      />
    </Card>
  )
}

// UserComponent.propTypes = {
//     user: PropTypes.shape({
//         uid: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.oneOf(['admin', 'client']).isRequired,
//         status: PropTypes.number.isRequired,
//         senderID: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         photoURL: PropTypes.string.isRequired,
//         time: PropTypes.any.isRequired,
//       })

// }

export default UserComponent

