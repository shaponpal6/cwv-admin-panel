import React from 'react'
import SVG from '../../images/index'

function Button(props) {
    return (
        <button className={"cwv-buttonRoot " + (props.hover === 'off' ? ' ' : ' cwv-button ') + (props.className ?? '')} type="button" onClick={props.onClick ?? ''}>
            {(!!props.textFast && props.title) && <span className="cwv-MenuText">{props.title}</span>}
            {props.icon && <span className="cwv-buttonLabel">
                {SVG(props.icon)}
            </span>}
            {(!props.textFast && props.title) && <span className="cwv-MenuText">{props.title}</span>}
            <span className="cwv-touchRipple"></span>
        </button>
    )
}

export default Button
