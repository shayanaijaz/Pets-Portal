import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import NewPets from './Pages/NewPetsPage';
import PetsPage from './Pages/PetsPage';
import PetDetails from './Pages/PetDetailsPage';

class App extends Component {

  render() {
    return (
      <Router>
          <Route exact path="/pets" component={PetsPage} />
          <Route path="/pets/:petID" component={PetDetails} />
          <Route path="/pets/new" component={NewPets} />
      </Router>
    )
  }
}

export default App;
