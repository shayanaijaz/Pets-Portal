import React, {Component} from "react";
import {getBreed, postPetData} from '../Data/PetData';
import {getLocationCoordinates} from '../Data/LocationData';
import Select from 'react-select';

type PetProps = {

}

type PetState = {
    name: string,
    type: string, 
    breed: string, 
    breedList: [{
        value: String | null, 
        label: String | null
    }],
    location: string,
    latitude: number, 
    longitude: number,
    image: File
}

export default class NewPets extends Component<PetProps, PetState> {
    constructor(props: PetProps){
        super(props);
        this.state = {
            name: null,
            type: null,
            breed: null,
            breedList: [{value: null, label: null}],
            location: null,
            latitude: null,
            longitude: null,
            image: null
        }
    }

    petTypeSelectedHandler = async (event: any) => {
        this.setState({type: event.target.value})
        const list = await getBreed(event.target.value);
        this.setState({breedList: list!})
    }

    nameChangedHandler = (event: any) => {
        this.setState({name: event.target.value})
    }

    breedChangedHandler = (selectedOption: any) => {
        this.setState({breed: selectedOption.value})
    }

    locationChangedHandler = async (event: any) => {
        this.setState({location: event.target.value})
        const coordinates = await getLocationCoordinates(event.target.value);
        this.setState({latitude: coordinates.lat, longitude: coordinates.lng});
    }

    fileSelectedHandler = (event: any) => {
        console.log(event.target.files[0])
        this.setState({image: event.target.files[0]})
    }

    handleSubmit = (event: any) => {
        postPetData(this.state)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Name: </label>
                <input type="text" name="name" onChange={this.nameChangedHandler}></input>

                <br></br>

                <label>Type: </label>
                <select name="type" defaultValue="empty" onChange={this.petTypeSelectedHandler}>
                    <option value = "empty" disabled>Choose a pet</option>
                    <option value = "dog">Dog</option>
                    <option value = "cat">Cat</option>
                </select>

                <br></br>

                <label>Breed: </label>
                <Select options={this.state.breedList} onChange={this.breedChangedHandler}/>

                <label>Location: </label>
                <input type="text" name="location" onBlur={this.locationChangedHandler}></input>

                <label>Latitude: </label>
                <input type="text" name="latitude" value={this.state.latitude?.toString() || ''} disabled ></input>

                <label>Longitude: </label>
                <input type="text" name="longitude" value={this.state.longitude?.toString() || ''} disabled ></input>

                <br></br>

                <label>Select an image: </label>
                <input type="file" onChange={this.fileSelectedHandler} />

                <input type="submit" value="Submit" />
            </form>
        )
    }


}