import React from 'react'

// import "./style.css";




function UserComponent({ user, onClick }) {
  return (
    <li className="cwv-clientRow cwv-clientRowActive" role="button" aria-disabled="false" onClick={onClick}>
      <div className="cwv-listAvatarWraper">
        <div className="cwv-listAvatar">
          <img alt="Jim Doe" src="https://randomuser.me/api/portraits/men/40.jpg"
            className="cwv-listAvatarImg" />
        </div>
      </div>
      <div className="cwv-listUserWraper"><span className="cwv-listUserName">{user[1].name ?? 'Anonymous'}</span>
        <p className="cwv-listUserMessage">
          System Engineer</p>
      </div>
      <span className="cwv-touchRipple"></span>
    </li>
  )
}

export default UserComponent

