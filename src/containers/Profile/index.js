import React from 'react'
import { Home, Settings, Users } from "react-feather";
// import Button from "../../components/Button";
// import Options from "./Options";

import "./style.css";

function Profile() {
  return (
    <div className="cwv-chatWraper ">
        <div className="cwv-console cwv-settingsWraper">
          <div className="cwv-header">
            <div className="cwv-UMCHETitle">
              <span className="cwv-UMCHEIcon">
                <Users size={30} />
              </span>
              <div className="cwv-UMCHEName">My Profile</div>
            </div>
            <div className="cwv-saveSettings">
              <Settings size={14} />
            </div>
          </div>
          <div className="cwv-body">
            <div className="cwv-userMessagesContainer">
              {/* <Options /> */}
            </div>
            <div className="cwv-consoleLeft">
              <h4 className="cwv-settingName">Settings </h4>
              <hr className="cwv-hr" />
              <ul className="cwv-optionItems">
                <li className="cwv-option">Setting 1</li>
                <li className="cwv-option">Setting 2</li>
                <li className="cwv-option">Setting 3</li>
                <li className="cwv-option">Setting 4</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile

