import React, { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from "react-redux";
import { setClientData, setMessages } from "../../redux/actions";
import { withFirebase } from "../../firebase";
import './style.css'

import MessageConponent from "../MessageConponent";

function MessagesContainer({ firebase, clientUID }) {
    const { clientData, messages, clientId } = useSelector((state) => state.chatConsole);
    const dispatch = useDispatch();


    const [_clientData, loading, error] = useDocument(
        firebase.getClientData(clientUID),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    useEffect(() => {
        console.log('_clientData shapshot', _clientData)
        // console.log('_clientData shapshot', _clientData.data())
        if (_clientData && _clientData.data()) {
            let clientSnapshot = _clientData.data()
            if (Array.isArray(clientSnapshot.messages)) {
                let clientMessageSnapshot = clientSnapshot.messages;
                dispatch(setMessages(clientMessageSnapshot))
                delete clientSnapshot.messages;
            }
            dispatch(setClientData(clientSnapshot))
        }
        return () => { }
    }, [loading])

    console.log('clientId', clientId)
    console.log('object', clientData)
    console.log('messages', messages)


    return (
        <div>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Messages: Loading...</span>}
                {/* {_clientData && <span>Document: {JSON.stringify(_clientData.data())}</span>} */}
                {_clientData && <span>{console.log(_clientData.data())}</span>}
            </p>

            {messages && messages.length
                ? messages.map((message, index) => {
                    return (
                        <MessageConponent
                            key={message.key}
                            message={message}
                        />
                    );
                })
                : "No Message, yay!"}
        </div>
    )
}

export default withFirebase(MessagesContainer)

