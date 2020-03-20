import axios from 'axios';


export const getBreed = async (type: string) => {

    let response: any = [];

    try {

        response = await axios.get('https://pets-api.herokuapp.com/petsBreed', {
            params: {
                type: type
            }
        })

        let breeds: [{
            value: String | null, 
            label: String | null
        }] = [{value: null, label: null}]

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

export const getPetData = async () => {
    let response: any = [];

    try {
        response = await axios.get("https://pets-api.herokuapp.com/pets");
        
        console.log(response.data)

        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const getPetDataByID = async (ID: number) => {
    let response: any = [];

    try {
        response = await axios.get(`https://pets-api.herokuapp.com/pets/${ID}`);
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}