import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Home from './containers/Home'
import Auth from './containers/Auth'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

function LoginPage() {
    const firebase = useFirebase()
    const auth = useSelector(state => state.firebase.auth)

    function loginWithGoogle() {
        return firebase.login({ provider: 'google', type: 'popup' })
    }

    function logout() {
        return firebase.login({ provider: 'google', type: 'popup' })
    }

    return (
        <div className="aaa">
            <div>
                <h2>Auth</h2>
                {
                    !isLoaded(auth)
                        ? <span>Loading...</span>
                        : isEmpty(auth)
                            ? <Auth />
                            : <Home />
                }
            </div>
        </div>
    )
}

export default LoginPage