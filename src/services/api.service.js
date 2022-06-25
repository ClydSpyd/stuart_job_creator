import axios from "axios";

export const queryApi = (query, map, callback) => {
    
    try {

        var request = {
            query,
            fields: ['name', 'geometry', 'formatted_address'],
          };

        var service = new window.google.maps.places.PlacesService(map);

        //get location data from Google Maps API
        service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {

                //pass succesful response to Stuart geocode API
                geocodeLocation(results[0], map, callback)
            }
            else{

                //dispatch error response
                callback({error:true})
            }
        });

    } catch (error) {

        callback({error:error.message})
        
    }
}

export const geocodeLocation = async (gapiData, map, callback) =>  {

    try {

        //get valid location data from Stuart API
        const { data } = await axios.post('https://stuart-frontend-challenge.vercel.app/geocode', { address:gapiData.formatted_address });
        
        //pass Stuart location data back to map component and update viewport focus
        callback({...data, formatted_address:gapiData.formatted_address})
        map.setCenter(gapiData.geometry.location);
        map.setZoom(17)
        
    } catch (error) {

        //dispatch error response if not valid location
        callback({error:true})
    }

}

export const createJobStuartApi = async (payload) => await axios.post('https://stuart-frontend-challenge.vercel.app/jobs', payload);
    
