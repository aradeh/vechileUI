import React, { Component } from 'react';
import { Button, ButtonGroup, Table, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class VehicleList extends Component {

    constructor(props){
        super(props);
        this.state = { vehicles: [], isLoading:true };
        this.remove = this.remove.bind(this);
    }

    componentDidMount(){
        this.setState({isLoading:true});

        fetch('api/v1/vehicles')
            .then(response => response.json())
            .then(data => this.setState({vehicles: data, isLoading: false}));
    }

    async remove(id){
        await fetch(`/api/v1/vehicles/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedVehicles = [...this.state.vehicles].filter(i => i.id !== id );
            this.setState({vehicles: updatedVehicles});
        });
    }

    render(){
        const {vehicles, isLoading} = this.state;

        if(isLoading){
            return <p>Content Loading...</p>;
        }

        const vehicleList = vehicles.map(vehicle => {
            return <tr key={vehicle.id}>
                <td style={{whiteSpace: 'nowrap'}}>{vehicle.year}</td>
                <td style={{whiteSpace: 'nowrap'}}>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/vehicles/"+ vehicle.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(vehicle.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
             </tr>
        } );

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/vehicles/new">Add Vehicle</Button>
                    </div>
                    <h3>Vehicle Details</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width = "20%">Year</th>
                                <th width = "20%">Make</th>
                                <th width = "20%">Model</th>
                                <th width = "10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VehicleList;