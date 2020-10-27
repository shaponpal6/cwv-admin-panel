import React, { useState, memo } from 'react'
import { connect } from "react-redux";
import { myChatActions } from '../../constants'

import ShortNotes from '../ShortNotes'
import ClientInfo from '../ClientInfo'
// import './style.css'


function ClientDetailsComponent() {


    const [myChatActionState, setMyChatActionsState] = useState(myChatActions[0].key);

    // myChatActionsState onChange Handeler
    const onMyChatActionTabChange = (key) => {
        console.log({ [key]: key });
        setMyChatActionsState(key);
    };


    return (
        <header className="cwv-UMCHeader">
            <div className="cwv-UMCHeaderWraper">

                <div className="cwv-avatar cwv-avatarCircle cwv-mr-30">
                    <img alt="avatar" src="https://randomuser.me/api/portraits/men/40.jpg" className="cwv-avatarImg" />
                </div>
                <h2 className="cwv-userOnChat">Jim Doe
                  <span className="cwv-userCaption">
                        <span className="cwv-ball cwv-ballGreen"></span>&nbsp;Online
                  </span>
                </h2>
                <button className="cwv-buttonRoot cwv-button" tabIndex="0" type="button" aria-label="More"
                    aria-haspopup="true">
                    <span className="cwv-buttonLabel">
                        <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                            </path>
                        </svg>
                    </span>
                    <span className="cwv-touchRipple"></span>
                </button>
            </div>
            <button className="cwv-buttonRoot cwv-button" tabIndex="0" type="button" aria-label="open drawer">
                <span className="MuiIconButton-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </span>
                <span className="cwv-touchRipple"></span>
            </button>
        </header>
    )
}

const mapStateToProps = (state) => ({
    clientData: state.chatConsole.clientData,
    shortNotes: state.chatConsole.shortNotes,
    operators: state.chatConsole.operators,
})

const mapDispatchToProps = {

}

// export default ClientDetailsComponent
export default connect(mapStateToProps, mapDispatchToProps)((memo(ClientDetailsComponent)))
// export default withFirebase(ClientDetailsComponent)

