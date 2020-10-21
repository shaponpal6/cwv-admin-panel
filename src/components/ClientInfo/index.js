import React, { memo } from 'react'
import { connect } from "react-redux";
import './style.css'


function MyClientInfo(props) {



    return (
        <div>
            ClientInfo page
            {JSON.stringify(props)}
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     operators: state.chatConsole.operators
// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)((memo(ClientInfo)))
export default MyClientInfo

