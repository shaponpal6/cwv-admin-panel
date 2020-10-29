import React from 'react'

function UserInfoRow({ name, value, type }) {
    if (!name || !value) return (<></>);

    return (
        <div className="cwv-UMCHERowBase cwv-UMCHERow cwv-button" role="button"
            aria-disabled="false">
            {type !== 'notes' &&
                <div className="cwv-listAvatar cwv-UMCHERowIcon">
                    <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                    </svg>
                </div>
            }
            <div className="cwv-UMCHERowTitle">
                {type !== 'notes' && <span className="cwv-UMCHERowLabel">{name}</span>}
                <p className="cwv-UMCHERowName">{value}</p>
            </div>
            <div className="cwv-UMCHERowActions">
                <button className="cwv-buttonRoot cwv-button cwv-userActionButton" type="button">
                    <span className="MuiButton-label">Edit</span>
                    <span className="cwv-touchRipple"></span>
                </button>
                <button className="cwv-buttonRoot cwv-button cwv-userActionButton" type="button">
                    <span className="MuiButton-label">Skip</span>
                    <span className="cwv-touchRipple"></span>
                </button>
            </div>
            <span className="cwv-touchRipple"></span>
        </div>
    )
}

export default UserInfoRow
