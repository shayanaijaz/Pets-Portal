import React, {Component} from 'react';
import {getPetData} from '../Data/PetData';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { RouteComponentProps } from 'react-router-dom';

interface PetState {
    pets: [{
        ID: number, 
        name: string, 
        type: string, 
        breed: string,
        image: string
    }]
    
}



export default class PetsPage extends Component<RouteComponentProps, PetState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            pets: [{
                ID: null,
                name: null,
                type: null,
                breed: null,
                image: null
            }]
        }
    }

    async componentDidMount() {
        const result = await getPetData();
        this.setState({pets: result});
    }

    renderTableData() {
        return this.state.pets.map((pet) => {
            const {ID, name, type, breed} = pet;
            return (
                <tr key={ID}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{breed}</td>
                <td><Link to={`/pets/${ID}`}>View</Link></td>
             </tr>
            )
        })
    }

    buttonClickedHandler = (event: any) => {
        this.props.history.push("/pets/new");
    }

    render() {
        return (
            <div>
                <Jumbotron className="jumbotron">
                    <h1>does your pet need an Umbrella?</h1>
                </Jumbotron>
                <Table striped borderless>
                    <tbody>
                        <tr>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>BREED</th>
                            <th>DETAILS</th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </Table>
                <div className="tableDiv">
                    <Button className="formButton" onClick={this.buttonClickedHandler}>Add New Pet</Button>
                </div>
            </div>
        )
    }
}
