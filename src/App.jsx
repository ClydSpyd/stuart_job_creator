import React, { useEffect, useReducer } from 'react'
import MapContainer from './components/MapContainer'
import Toast from './components/Toast'
import { initialState } from './config/initialState'
import { initiateMapsAPI } from './config/initiateMaps'
import { reducer } from './config/reducer'
import './styles/main.scss'

const App = () =>{

    const [ appState, dispatch ] = useReducer(reducer, initialState)

    useEffect(()=>{
        //append GAPI script to body if not yet added
        const script = document.getElementById("gapi_script")
        if(!appState.map && !script)initiateMapsAPI(dispatch)
    },[])


    return  <>
                <MapContainer appState={appState} dispatch={dispatch} />
                <Toast text={appState.toastText} dispatch={dispatch} />
            </> 
    
    
}

export default App;
