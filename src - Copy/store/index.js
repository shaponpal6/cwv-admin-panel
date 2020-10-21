import React, {createContext, useReducer} from "react";
import Reducer from '../reducers';
import InitState from './state'; 
import propTypes from 'prop-types';


const initialState = {
    ...InitState,
    posts: [],
    error: null
};
export const AppContext = createContext(initialState);


const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
};
AppContextProvider.propTypes = {
    children: propTypes.node.isRequired
}


export default AppContextProvider;