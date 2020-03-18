import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import NewPets from './Components/NewPets';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={NewPets} />
        </Switch>
      </Router>
    )
  }
}

export default App;
