import React, {Component} from "react";
import {getBreed, postPetData} from '../Data/PetData';
import {getLocationCoordinates} from '../Data/LocationData';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { RouteComponentProps } from 'react-router-dom';


interface PetState {
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
    image: File, 
    errorMessage: string
}

export default class NewPets extends Component<RouteComponentProps, PetState> {
    constructor(props: RouteComponentProps){
        super(props);
        this.state = {
            name: null,
            type: null,
            breed: null,
            breedList: [{value: null, label: null}],
            location: null,
            latitude: null,
            longitude: null,
            image: null, 
            errorMessage: null
        }
    }

    petTypeChangedHandler = async (selectedOption: any) => {
        this.setState({type: selectedOption.label})
        const list = await getBreed(selectedOption.value);
        this.setState({breedList: list})
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

    handleSubmit = async (event: any) => {

        if (this.state.name == null || this.state.type == null || this.state.breed == null || this.state.image == null || this.state.location == null) {
            this.setState({errorMessage: "Missing required values"})
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            await postPetData(this.state)
            this.props.history.push("/pets");
        }  
    }

    render() {
        
        return (
            <div>
            <Jumbotron className="jumbotron">
                <h1>add your pet</h1>
            </Jumbotron>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="name" onChange={this.nameChangedHandler}></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Type</Form.Label>
                    <Col sm={10}>
                        <Select options={[{value:'dog', label:'Dog'}, {value:'cat', label:'Cat'}]} onChange={this.petTypeChangedHandler}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Breed</Form.Label>
                    <Col sm={10}>
                        <Select options={this.state.breedList} onChange={this.breedChangedHandler}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Location</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="location" onBlur={this.locationChangedHandler}></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                <Form.Label column sm={2}>Latitude</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="latitude" value={this.state.latitude?.toString() || ''} disabled ></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                <Form.Label column sm={2}>Longitude</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="longitude" value={this.state.longitude?.toString() || ''} disabled ></Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Image</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" onChange={this.fileSelectedHandler} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="errorLabel">
                    <Form.Label>{this.state.errorMessage}</Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="formButton">
                    <Col sm={12}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
            </div>

        )
    }
}