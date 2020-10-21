import React, { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { setMenuState } from "../../redux/actions";
import { Menu, Row, Col } from "antd";
import { myChatActions } from '../../../constants'
import "./style.css";


class ClientDataContainer extends PureComponent {


    constructor(props) {
        super(props)

        this.state = {
            myChatActionState: myChatActions[0].key
        }
    }



    // myChatActionsState onChange Handeler
    onMyChatActionTabChange = (key) => {
        console.log({ [key]: key });
        // setMyChatActionsState(key);
        this.setState({ [myChatActionState]: key })
    };

    // Chat Button Open / Close
    onMenuClick = (e) => {
        console.log(e.key);
        this.props.setMenuState(e.key);
    };


    render() {


        return (
            <div id="wpcwv-clientDitails">

                <Card
                    style={{ width: "100%", height: "92vh" }}
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
}

const mapStateToProps = (state) => ({
    clientDitails: state.chatConsole.clientDitails
})

export default connect(mapStateToProps, { setMenuState })(memo(ClientDataContainer))
