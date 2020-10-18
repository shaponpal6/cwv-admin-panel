import React from 'react'
// import PropTypes from 'prop-types'
import { Avatar } from "antd";

import "./style.css";




function UserComponent({ user, onClick }) {
  return (
    <div className="wpcwv-clientList" onClick={onClick}>
      <div className="wpcwv-cardAvatar">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </div>
      <div className="wpcwv-cardDetail">
        <div className="wpcwv-cardDetailTop">
          <div className="wpcwv-clientName wpcwv-textEllipsis">{user[1].name ?? 'Anonymous'}</div>
          <div className="wpcwv-clientSeen wpcwv-textEllipsis">11 mins ago</div>
        </div>
        <div className="wpcwv-cardDetailBottom">
          <div className="wpcwv-clientMessage wpcwv-textEllipsis">This is message</div>
          <div className="wpcwv-clientStatus">online</div>
        </div>
      </div>
    </div>
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

