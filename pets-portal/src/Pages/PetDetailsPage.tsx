import React, {Component} from 'react';
import ReactComponentProps, { RouteComponentProps } from 'react-router-dom';
import {getPetDataByID} from '../Data/PetData'; 
import {getLocationWeather} from '../Data/LocationData';

interface PetDetailsProps extends RouteComponentProps<{
    petID: string
}> {}

interface PetDetailsState {
    ID: number,
    weather: string
}

export default class PetDetails extends Component<PetDetailsProps, PetDetailsState> {
    constructor(props: PetDetailsProps) {
        super(props);
        this.state = {
            ID: parseInt(this.props.match.params.petID),
            weather: null
        }
    }

    async componentDidMount() {
        const result = await getPetDataByID(this.state.ID);
        const weatherType = await getLocationWeather(result[0].latitude, result[0].longitude)
        this.setState({weather: weatherType});
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        return (
        <label>{this.state.weather == 'rain' ? "Yup" : "Nope"}</label>
        )
    }
}