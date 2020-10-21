import React, { memo } from 'react'
// import { connect } from "react-redux";
import { shallowEqual, useSelector } from 'react-redux'
import './style.css'


function Operators() {

    const operators = useSelector(state => state.chatConsole.operators, shallowEqual)
    console.log('operators', operators)


    return (
        <div>
            operators
            {JSON.stringify(operators)}
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     operators: state.chatConsole.operators
// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)((memo(Operators)))
export default memo(Operators)

