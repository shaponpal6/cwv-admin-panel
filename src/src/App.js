import React from 'react'
import { Provider } from 'react-redux'
import firebase from '@firebase/app'
import '@firebase/auth'
// import '@firebase/database'
import '@firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
// import Home from './Home'
import Home2 from './containers/Home'
import configureStore from './store/index'
import initialState from './store/state'
import { firebase as fbConfig, rrfConfig } from './config'
import 'antd/dist/antd.css';

// const initialState = window && window.__INITIAL_STATE__ // set initial state here
console.log('object', initialState)
const store = configureStore(initialState)
// Initialize Firebase instance
firebase.initializeApp(fbConfig)

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <Home2 />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
