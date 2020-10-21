import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

function LogOutButton() {
    const firebase = useFirebase()
    const auth = useSelector(state => state.firebase.auth)

    function loginWithGoogle() {
        return firebase.login({ provider: 'google', type: 'popup' })
    }

    function logout() {
        return firebase.logout();
    }

    return (
        <div className="wpcwv-logOutButton">
            {
                !isLoaded(auth)
                    ? <button>Loading...</button>
                    : isEmpty(auth)
                        ? <button onClick={loginWithGoogle}>Login With Google</button>
                        : <button onClick={logout}>Login Out</button>
            }
        </div>
    )
}

export default LogOutButton