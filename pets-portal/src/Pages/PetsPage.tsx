import React, {Component} from 'react';
import {getPetData} from '../Data/PetData';
import {Link} from 'react-router-dom';

interface PetState {
    pets: [{
        ID: number, 
        name: string, 
        type: string, 
        breed: string,
        image: string
    }]
    
}

export default class PetsPage extends Component<{}, PetState> {
    constructor(props: {}) {
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

    componentDidUpdate() {
        console.log(this.state);
    }

    renderTableData() {
        return this.state.pets.map((pet) => {
            const {ID, name, type, breed} = pet;
            return (
                <tr key={ID}>
                <td>{ID}</td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{breed}</td>
                <td><Link to={`/pets/${ID}`}>View</Link></td>
             </tr>
            )
        })
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        )
    }
}