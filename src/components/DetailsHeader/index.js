import React from 'react'
import SVG from '../../images/index'

function DetailsHeader(props) {
    return (
        <div className="cwv-UMCHETitle">
            {props.icon && <span className="cwv-UMCHEIcon">
                {SVG(props.icon)}
            </span>}
            {props.title && <div className="cwv-UMCHEName">{props.title}</div>}
        </div>
    )
}

export default DetailsHeader
