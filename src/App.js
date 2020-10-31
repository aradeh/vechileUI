import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VehicleList from './VehicleList';
import VehicleEdit from './VehicleEdit';


class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}></Route>
          <Route path='/vehicles' exact={true} component={VehicleList}></Route>
          <Route path='/vehicles/:id' component={VehicleEdit}/>
        </Switch>
      </Router>

    )
  }
}

export default App;
