import React, { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from "react-redux";
import { setClientData, setMessages } from "../../redux/actions";
import { withFirebase } from "../../firebase";
import './style.css'

import MessageConponent from "../MessageConponent";

function MessagesContainer({ firebase, clientUID }) {
    // const clientData = useSelector((state) => state.chatConsole.clientData);
    // const { messages, setMessages2 } = useState([]);
    // const dispatch = useDispatch();





    const [_clientData, loading, error] = useDocument(
        firebase.getClientData(clientUID),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // useEffect(() => {
    //     console.log('_clientData shapshot', _clientData)
    //     // console.log('_clientData shapshot', _clientData.data())
    //     if (_clientData && _clientData.data()) {
    //         let clientSnapshot = _clientData.data()
    //         if (Array.isArray(clientSnapshot.messages)) {
    //             let clientMessageSnapshot = clientSnapshot.messages;
    //             dispatch(setMessages(clientMessageSnapshot))
    //             delete clientSnapshot.messages;
    //         }
    //         dispatch(setClientData(clientSnapshot))
    //     }
    //     return () => { }
    // }, [loading])

    // Filter User
    const filterClientData = (clientDataSnapshot) => {
        let messages = [];
        let clientInfo = {};
        // if (loading) return [clientInfo, messages];
        if (!clientDataSnapshot || clientDataSnapshot.data() === null || typeof clientDataSnapshot.data() !== 'object') {
            return [clientInfo, messages]
        }
        let data = clientDataSnapshot.data();
        if (data.messages !== null && Array.isArray(data.messages)) {
            // setMessages2(data.messages)
            messages = data.messages;
            delete data.messages;
        }
        // dispatch(setClientData(data));
        clientInfo = data;
        return [clientInfo, clientInfo, messages];
    }
    const [clientInfo, messages] = filterClientData(_clientData);
    //  filterClientData(_clientData);


    return (
        <div>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {clientInfo && <strong>Info: {JSON.stringify(clientInfo)}</strong>}
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
                : "No Messages!"}
        </div>
    )
}

export default withFirebase(MessagesContainer)
