import React, {Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {getPetDataByID} from '../Data/PetData'; 
import {getLocationWeather} from '../Data/LocationData';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image'

interface PetDetailsProps extends RouteComponentProps<{
    petID: string
}> {}

interface PetDetailsState {
    ID: number,
    weather: string,
    name: string,
    image: string
}

export default class PetDetails extends Component<PetDetailsProps, PetDetailsState> {
    constructor(props: PetDetailsProps) {
        super(props);
        this.state = {
            ID: parseInt(this.props.match.params.petID),
            weather: null,
            name: null,
            image: null
        }
    }

    async componentDidMount() {
        const result = await getPetDataByID(this.state.ID);
        const weatherType = await getLocationWeather(result[0].latitude, result[0].longitude)
        this.setState({weather: weatherType, name: result[0].name, image: result[0].image});
    }

    render() {
        return (
            <div>
                <Jumbotron className="jumbotron">
                    <h1>{this.state.weather === 'rain' ? "Yup!" : "Nope!"}</h1>
                    <p>Your pet {this.state.name} will {this.state.weather === 'rain' ? "" : "NOT"} need an umbrella today</p>
                </Jumbotron>
                <div className="imageDiv">
                    <Image src={this.state.image} thumbnail />
                </div>
            </div>
        )
    }
}