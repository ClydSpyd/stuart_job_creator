import React, { useRef } from 'react'
import SearchBox from './SearchBox';
import pickPin from '../assets/pickUpMarker.svg'
import dropPin from '../assets/dropoffMarker.svg'
import { addAnimation } from '../utils/addAnimation';

const MapContainer = ({ appState, dispatch }) => {

    const searchRef = useRef(null)
    const { map, markers, locationData } = appState

    const handleApiResponse = (response, type) => {

        //handle error response
        if(response.error){
            addAnimation(searchRef, 'shake', 400)
            return dispatch({type:'set_input', payload:{...locationData, [type]:{error:true}}})
        }
        
        //create new pin
        const newMarker = new window.google.maps.Marker({
            position: {lat:response.latitude, lng:response.longitude},
            icon:type==="pickup" ? pickPin : dropPin,
            id: `${type}_marker`,
            animation: google.maps.Animation.DROP,
            map:map
        })

        //update markers array and location data in app state
        const newMarkersArray = [...markers]
        newMarkersArray[type==='pickup' ? 0 : 1 ] = newMarker
        dispatch({type:'set_markers', payload:newMarkersArray})
        dispatch({type:'set_input', payload:{...locationData, [type]:response}})

    }

    return  <>
                <SearchBox
                    map={map}
                    searchRef={searchRef}
                    handleApiResponse={handleApiResponse}
                    dispatch={dispatch}
                    appState={appState} />
                <div id="map" />
            </>
}

export default MapContainer;