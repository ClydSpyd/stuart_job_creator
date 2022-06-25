import React, { useEffect, useRef } from 'react';
import { queryApi } from '../services/api.service';
import { normalize } from '../utils/normalize';
import CreateBtn from './CreateBtn';
import SearchIcon from './SearchIcon';

const returnIconStatus = input =>  !input ? "blank" : input.error ? "error" : input.loading ? "loading" : "present"

const SearchBox = ({ map, handleApiResponse, appState:{markers, locationData}, dispatch, searchRef }) => {

    const pickupRef = useRef(null)
    const dropoffRef = useRef(null)

    useEffect(()=>{
        //update input text to correctly formatted address string received from API
        const { pickup, dropoff} = locationData
        if(Object.values(locationData).some(i => i?.formatted_address)){
            if(pickup?.formatted_address)pickupRef.current.value=pickup.formatted_address
            if(dropoff?.formatted_address)dropoffRef.current.value=dropoff.formatted_address
        }
    },[locationData])


    const handleSearch = (type,searchTerm) => {

        //execute only if new text is entered
        if(searchTerm && normalize(searchTerm)!==normalize(locationData[type]?.formatted_address)){ 
            
            //remove existing pin if already present
            for (let i = 0; i < markers.length; i++) {
                if(markers[i]?.id===`${type}_marker`){
                    markers[i].setMap(null);
                }
            }

            dispatch({type:'set_input', payload:{...locationData, [type]:{loading:true}}})
            queryApi(searchTerm, map, (response)=>handleApiResponse(response, type));
        }
    }
    

    return  <div ref={searchRef} className='searchBoxContainer'>

                <div className="inputRow">
                    <SearchIcon
                        type="pickup"
                        status={returnIconStatus(locationData.pickup)} />
                    <input
                        ref={pickupRef}
                        onBlur={e=>handleSearch('pickup',e.target.value)}
                        type="text"/>
                </div>

                <div className="inputRow">
                    <SearchIcon
                    type="dropoff"
                    status={returnIconStatus(locationData.dropoff)} />
                    <input
                        ref={dropoffRef}
                        onBlur={e=>handleSearch('dropoff',e.target.value)}
                        type="text"/>
                </div>

                <CreateBtn
                    dispatch={dispatch}
                    locationData={locationData}
                    refs={{pickupRef, dropoffRef}}
                    markers={markers}
                    map={map} />

            </div>
}

export default SearchBox