import axios from 'axios';
import { format } from 'util';

interface breedList {
    value: String, 
    label: String
}

export const getBreed = async (type: string) => {

    let response: any = [];

    try {

        if (type === "dog") {
            response = await axios.get('https://api.thedogapi.com/v1/breeds', {
                headers: {
                    'x-api-key': '2c9a0380-19a8-4907-8662-b2eb68823c3f'
                }
            })  
        }
        else if (type === "cat") {
            response = await axios.get('https://api.thecatapi.com/v1/breeds', {
                headers: {
                    'x-api-key': 'ccf0aa15-1f15-4c9f-91a6-9cf4d4549089'
                }
            }) 
        }

        let breeds: [{
            value: String | null, 
            label: String | null
        }] = [{value: null, label: null}]

        // let breeds: breedList[] = [];

        response.data.forEach(function(item: any) {
            breeds.push({value: item.name, label: item.name});
        })
        return breeds;

    } 
    catch (err) {
        console.log(err)
    }

}

export const postPetData = async (params: {name: string, type: string, breed: string, latitude: number,longitude: number, 
    image: File}) => {
    
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("type", params.type);
    formData.append("breed", params.breed);
    formData.append("latitude", params.latitude.toString());
    formData.append("longitude", params.longitude.toString());
    formData.append("attachment", params.image);

    let response: any = [];

    try {
        response = await axios.post("https://pets-api.herokuapp.com/pets", formData);
        console.log(response)
    } catch (err) {
        console.log(err)
    }


}