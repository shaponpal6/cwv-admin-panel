import React, { useState, memo } from 'react'
import { connect } from "react-redux";
import { Card } from "antd";
import { myChatActions } from '../../constants'

import ShortNotes from '../ShortNotes'
import Operators from '../Operators'
import ClientInfo from '../ClientInfo'
import './style.css'

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const TabSelector = ({ tab }) => {
    console.log('tab', tab)

    return (
        <>
            {tab === 'userDetails' && <ClientInfo />}
            {tab === 'shortNotes' && <ShortNotes />}
            {tab === 'chatOperators' && <Operators />}
        </>
    )
}

function ClientDetailsComponent() {

    console.log('ClientDetailsComponent>>>', '.....')

    /**
     * myChatActionsState Handeler
     * Load Clients Details by filtering tab key
     */
    const [myChatActionState, setMyChatActionsState] = useState(myChatActions[0].key);

    // myChatActionsState onChange Handeler
    const onMyChatActionTabChange = (key) => {
        console.log({ [key]: key });
        setMyChatActionsState(key);
    };


    return (
        <div>
            <Card
                style={{ width: "100%", height: "75vh" }}
                bodyStyle={{ overflow: "auto", height: "100%", padding: "0" }}
                tabList={myChatActions}
                activeTabKey={myChatActionState}
                tabBarExtraContent={<span>Setting</span>}
                onTabChange={(key) => onMyChatActionTabChange(key)}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                {myChatActionState}
                <TabSelector tab={myChatActionState} />

                {/* <ClientInfo />
                <ShortNotes />
                <Operators /> */}


            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({
    clientData: state.chatConsole.clientData,
    shortNotes: state.chatConsole.shortNotes,
    operators: state.chatConsole.operators,
})

const mapDispatchToProps = {

}

// export default ClientDetailsComponent
export default connect(mapStateToProps, mapDispatchToProps)((memo(ClientDetailsComponent)))
// export default withFirebase(ClientDetailsComponent)

