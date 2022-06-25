import { initialPosition } from "./initialState"

export const initiateMapsAPI = (callback) => {

    let s =document.createElement('script')
    s.src=`https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GAPI_KEY}`
    s.id="gapi_script"
    document.body.appendChild(s)

    s.addEventListener('load', () => {
        
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: initialPosition,
            zoom: 13,
            mapId:'4aed07d142ebeb46',
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });

        callback({type:'set_map', payload:map});
    })

}




// const setMapPosition = async (position) => {
//     const { latitude,longitude } = position.coords;
//     map.setCenter(new google.maps.LatLng(latitude, longitude))
// }
// navigator.geolocation.getCurrentPosition(setMapPosition)