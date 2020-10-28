import React, { useState, useEffect, memo } from 'react'
import { connect, useDispatch } from "react-redux";
import Button from '../../components/Button';
import { useDocument } from 'react-firebase-hooks/firestore';
import { setClientData, setMessages, setShortNotes, setOperators } from "../../redux/actions";
import { withFirebase } from "../../firebase";
import MessagesContainer from "../../components/MessagesContainer";
// import ClientDetailsContainer from "./ClientDetailsContainer";
import Footer from "../../components/Footer";
import ClientName from '../../components/ClientName';
import ClientDetails from '../../components/ClientDetails';
import ClientNotes from '../../components/ClientNotes';
import Settings from '../../components/Settings';


export const AsyncClientData = ({ firebase, clientId }) => {

    const dispatch = useDispatch();

    const [messages, setMessagesState] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [shortNotes, setShortNotesState] = useState({});
    const [operators, setOperatorsState] = useState({});
    const [menu, setMenu] = useState('');
    const [menuToggle, setMenuToggle] = useState(false);

    const changeMenuState = (key) => {
        console.log(key);
        if (!menuToggle || menu === key || menu === '') setMenuToggle(!menuToggle);
        setMenu(key);
    };

    const onMessageSend = (message) => {
        console.log('offline message send>>', message);
    };

    const onMenuToggle = (key) => {
        console.log(menuToggle);
        setMenuToggle(!menuToggle);
    };

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
                setMessagesState(clientSnapshot.messages);
                dispatch(setMessages(clientSnapshot.messages));
            }
            if (typeof clientSnapshot.metaData === 'object' && clientSnapshot.metaData !== null) {
                setUserDetails(clientSnapshot.metaData);
                dispatch(setClientData(clientSnapshot.metaData))
            }
            if (typeof clientSnapshot.shortNotes === 'object' && clientSnapshot.shortNotes !== null) {
                setShortNotesState(clientSnapshot.shortNotes)
                dispatch(setShortNotes(clientSnapshot.shortNotes))
            }
            if (typeof clientSnapshot.operators === 'object' && clientSnapshot.operators !== null) {
                setOperatorsState(clientSnapshot.operators);
                dispatch(setOperators(clientSnapshot.operators));
            }
            // dispatch(setClientData(clientSnapshot))
        }
        return () => {

        }
    }, [_clientData])


    return (
        <>
            <header className="cwv-UMCHeader">
                <div className="cwv-UMCHeaderWraper">
                    <div className="cwv-UMCHeaderWraperTop">
                        <div className="cwv-UMCHeaderTopBox">
                            <div className="cwv-UMCHeaderSectionOne">
                                <ClientName name={'Shapon Pal'} status={'Online'} loading={loading} error={error} />
                            </div>
                            <div className="cwv-UMCHeaderSectionTwo">
                                <Button className="cwv-userMenuButton" icon="userPlus" title="Details" onClick={() => changeMenuState('details')} />
                                <Button className="cwv-userMenuButton" icon="edit" title="Short Notes" onClick={() => changeMenuState('notes')} />
                                <Button className="cwv-userMenuButton" icon="lock" title="Setting" onClick={() => changeMenuState('settings')} />
                            </div>
                        </div>
                    </div>
                    <div className="cwv-UMCHeaderExpend" style={{ display: (menuToggle ? 'block' : 'none') }}>
                        <div className="cwv-UMCHEWraper">
                            {menu === 'details' && <ClientDetails userDetails={userDetails} loading={loading} error={error} />}
                            {menu === 'notes' && <ClientNotes shortNotes={shortNotes} loading={loading} error={error} />}
                            {menu === 'settings' && <Settings operators={operators} loading={loading} error={error} />}
                        </div>
                    </div>
                </div>
                <Button className="cwv-userInfoToggle" hover="off" icon="down" onClick={onMenuToggle} />
            </header>
            <section className="cwv-chatRoom">
                <MessagesContainer messages={messages} loading={loading} error={error} />
            </section>
            <Footer onMessageSend={onMessageSend} loading={loading} error={error} />
        </>
    )
}

export default withFirebase(memo(AsyncClientData))




