import React, { useState, useEffect, memo } from 'react'
import { connect, useDispatch } from "react-redux";
import { useDocument } from 'react-firebase-hooks/firestore';
import { setClientData, setMessages, setClientNotes } from "../../redux/actions";
import { FirebaseContext, withFirebase } from "../../firebase";


export const ShortNots = ({ firebase, shortNots }) => {

    // if (!shortNots) return;
    // const dispatch = useDispatch();

    console.log('shortNots Async', shortNots)

    return (
        <div>
            shortNots
            {JSON.stringify(shortNots)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    shortNots: state.chatConsole.shortNotes
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(memo(ShortNots)))




