import React from 'react'
import SVG from '../../images/index'
import UserPlus from '../../images/user-plus.svg'

function Button(props) {
    return (
        <button className={"cwv-buttonRoot " + (props.hover ? ' ' : ' cwv-button ') + (props.className ?? '')} type="button" onClick={props.onClick ?? ''}>
            {props.icon && <span className="cwv-buttonLabel">
                {SVG(props.icon)}
            </span>}
            {props.title && <span className="cwv-MenuText">{props.title}</span>}
            <span className="cwv-touchRipple"></span>
        </button>
    )
}

export default Button
