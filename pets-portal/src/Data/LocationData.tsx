import axios from 'axios'

export const getLocationCoordinates = async(location: string) => {

    let response: any = [];

    response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
            'q': location,
            'pretty': 1,
            'key': 'ea0bf2d504184284aea00c654a7d223c'
        }
    });

    return response.data.results[0].geometry;

}