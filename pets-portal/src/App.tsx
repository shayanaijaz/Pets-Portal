import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewPets from './Pages/NewPetsPage';
import PetsPage from './Pages/PetsPage';
import PetDetails from './Pages/PetDetailsPage';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/pets" component={PetsPage} />
          <Route exact path="/pets/new" component={NewPets} />
          <Route exact path="/pets/:petID" component={PetDetails} />
        </Switch>
      </Router>
    )
  }
}

export default App;
