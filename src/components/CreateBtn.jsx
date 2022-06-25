import React, { useState } from 'react';
import { createJobStuartApi } from '../services/api.service';
import loader from '../assets/loader_white.svg'
import { initialPosition } from '../config/initialState';

const returnBtnClass = input => (!Object.values(input.locationData).every(i => i?.formatted_address) || input.loading ) ? "createBtn inactive" : "createBtn"

const CreateBtn = ({ dispatch, locationData, markers, map, refs:{ pickupRef, dropoffRef } }) => {

    const [ loading, toggleLoading ] = useState(false)

    const createJob = async () => {

        toggleLoading(true)
        
        //POST to Stuart API
        const {status} = await createJobStuartApi({pickup: locationData.pickup.address, dropoff:locationData.dropoff.address})

        //reset UI
        dispatch({ type:"reset_state"})
        map.setCenter(initialPosition);
        map.setZoom(13)
        pickupRef.current.value="";
        dropoffRef.current.value=""
        toggleLoading(false)

        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        //display toast message depending on success/failure response from API
        const toastMsg = status === 200 ? "Job has been created successfully!" : "Something went wrong, please try again"
        dispatch({type:"set_toast_text", payload:toastMsg})

    }

    return  <div onClick={createJob} className={returnBtnClass({locationData,loading})}>
                {!loading ? "Create Job" : <img className='spinner' src={loader} />}
            </div>
}

export default CreateBtn;