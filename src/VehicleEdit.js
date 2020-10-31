import React,  { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class VehicleEdit extends Component{
    emptyVehicleObject = {
        year: '',
        make: '',
        model: '',
    };

    constructor(props){
        super(props);
        this.state = {
            item: this.emptyVehicleObject
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if(this.props.match.params.id !== 'new'){
            const vehicle = await (await fetch(`/api/v1/vehicles/${this.props.match.params.id}`)).json();
            this.setState({item: vehicle});
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.id;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event){
        event.preventDefault();
        const {item} = this.state;
        console.log(JSON.stringify(item));
        if(this.props.match.params.id !== 'new'){
            await fetch(`/api/v1/vehicles/${item.id}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/vehicles');
        }
        else{
            await fetch('/api/v1/vehicles',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/vehicles');
        }
    }

    render(){
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Vehicle' : 'Add Vehicle'}</h2>;
        
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input type="text" name="year" id="year" value={item.year || ''}
                            onChange={this.handleChange} autoComplete="year"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="make">Make</Label>
                        <Input type="text" name="make" id="make" value={item.make || ''}
                            onChange={this.handleChange} autoComplete="make"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="model">Model</Label>
                        <Input type="text" name="model" id="model" value={item.model || ''}
                            onChange={this.handleChange} autoComplete="model"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vehicles">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(VehicleEdit); 