import React, { useState, memo } from 'react'
import DetailsHeader from '../DetailsHeader'
import UserInfoRow from '../UserInfoRow'

function ClientDetails({ userDetails, loading, error }) {
    console.log('ClientDetails props', userDetails)

    return (
        <>
            <DetailsHeader icon="userPlus" title="User Details" />
            <hr className="cwv-hr" />
            <div className="cwv-UMCHEDesc">
                <div className="cwv-UMCHEDescWraper">
                    {userDetails && Object.keys(userDetails).map((key, index) => {
                        console.log('key, index', key, index, userDetails[key])
                        return <UserInfoRow key={"row-" + index} name={key} value={userDetails[key]} />
                    })}
                </div>
            </div>
            <hr className="cwv-hr" />
        </>
    )
}


export default memo(ClientDetails)

