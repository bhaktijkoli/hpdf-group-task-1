import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Header />
          <Route exact path="/" component={Login}/>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }
}
export default App;
