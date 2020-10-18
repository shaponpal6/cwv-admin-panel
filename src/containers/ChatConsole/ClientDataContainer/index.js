import React, { Component, useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../../firebase";
import RSC from "react-scrollbars-custom";
import { setClientID } from "../../../redux/actions";
import Loading from "../../../components/Loading";
import UserConponent from "../../../components/UserConponent";
import { myChatTabs } from '../../../constants'
import { Card, message } from "antd";
import "./style.css";

import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";


export class ClientDataColtroller extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}


export default withFirebase(ClientDataColtroller)
