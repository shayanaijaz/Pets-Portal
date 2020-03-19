import axios from 'axios'

export const getLocationCoordinates = async(location: string) => {

    let response: any = [];

    response = await axios.get('https://pets-api.herokuapp.com/location', {
        params: {
            location: location
        }
    })
    return response.data;
}

export const getLocationWeather = async(latitude: number, longitude: number) => {
    let response: any = [];

    response = await axios.get('https://pets-api.herokuapp.com/locationWeather', {
        params: {
            lat: latitude,
            lng: longitude
        }
    })

    return response.data.precipType;
}