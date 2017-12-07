import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';

// components
import List from './components/Staff/List';
import Show from './components/Staff/Show';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <Route exact path="/" component={List} />
          <Route path="/show" component={Show} />
        </Grid>
      </Router>
    );
  }
}

export default App;
