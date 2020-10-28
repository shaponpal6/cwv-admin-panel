import React from 'react'

function ClientName({ name, status }) {
    return (
        <>
            <div className="cwv-avatar cwv-avatarCircle cwv-mr-30">S</div>
            <h2 className="cwv-userOnChat cwv-button">
                <span className="cwv-userName">{name}</span>
                <span className="cwv-userCaption">
                    <span className="cwv-ball cwv-ballGreen"></span>&nbsp;{status}
                </span>
            </h2>
        </>
    )
}

export default ClientName
