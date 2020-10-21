import React from 'react'
import './style.css'

function CardComponent(props) {
    // console.log('props', props)
    const childrenWithProps = React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        const props = child.props;
        if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
        }
        return child;
    });

    return (
        <div className="wpcwv-cardComponent">
            {props.image &&
                <div className="wpcwv-cardImageCover">
                    <img src={props.image} />
                </div>
            }
            <div className="wpcwv-cardDesc">
                {props.title && <h1>{props.title}</h1>}
                {props.content && <p>{props.content}</p>}
                {childrenWithProps}

            </div>

            {props.footer && <div className="wpcwv-cardFooter"><button className="wpcwv-button wpcwv-buttonPrimary wpcwv-aniSVGRight" onClick={props.onClick}>{props.footer} <svg width="19" height="14" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 9H22M12 1.5L20.9333 8.2C21.4667 8.6 21.4667 9.4 20.9333 9.8L12 16.5" stroke="white" strokeWidth="3" />
            </svg></button></div>}
        </div>
    )
}

export default CardComponent
