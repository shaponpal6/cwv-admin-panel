import React, { useState, useEffect, memo } from 'react'
import { connect, useDispatch } from "react-redux";
import { useDocument } from 'react-firebase-hooks/firestore';
import { setClientData, setMessages, setShortNotes, setOperators } from "../../redux/actions";
import { FirebaseContext, withFirebase } from "../../firebase";


export const AsyncClientData = ({ firebase, clientId }) => {

    if (!clientId) return;
    const dispatch = useDispatch();

    const [_clientData, loading, error] = useDocument(
        firebase.getClientData(clientId),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );


    useEffect(() => {
        if (_clientData && _clientData.data()) {
            console.log('_clientData >>> ', _clientData.data())
            let clientSnapshot = _clientData.data()
            if (Array.isArray(clientSnapshot.messages)) {
                // let clientMessageSnapshot = clientSnapshot.messages;
                dispatch(setMessages(clientSnapshot.messages))
                // delete clientSnapshot.messages;
            }
            if (typeof clientSnapshot.metaData === 'object' && clientSnapshot.metaData !== null) {
                dispatch(setClientData(clientSnapshot.metaData))
            }
            if (typeof clientSnapshot.shortNotes === 'object' && clientSnapshot.shortNotes !== null) {
                dispatch(setShortNotes(clientSnapshot.shortNotes))
            }
            if (typeof clientSnapshot.operators === 'object' && clientSnapshot.operators !== null) {
                dispatch(setOperators(clientSnapshot.operators))
            }
            // dispatch(setClientData(clientSnapshot))
        }
        return () => {

        }
    }, [_clientData])





    console.log('fire', firebase)
    console.log('clientId Async', clientId)

    return (
        <div>
            Async data
        </div>
    )
}

const mapStateToProps = (state) => ({
    clientId: state.chatConsole.clientId
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(memo(AsyncClientData)))




