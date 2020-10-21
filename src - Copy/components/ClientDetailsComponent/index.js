import React, { useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
// import { setClientData, setMessages } from "../../redux/actions";
// import UserConponent from "../../components/UserConponent";
import { myChatActions } from '../../constants'
import { withFirebase } from "../../firebase";
import './style.css'

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;


function ClientDetailsComponent() {
    // const { clientData, clientId } = useSelector((state) => state.chatConsole);
    // const dispatch = useDispatch();

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
                <Meta

                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </div>
    )
}

export default withFirebase(ClientDetailsComponent)

