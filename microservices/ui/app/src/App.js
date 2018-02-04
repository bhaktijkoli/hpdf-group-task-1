import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux"

import {getAuthUser} from './actions/authActions'


import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    getAuthUser(this.props);
  }
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
function mapStateToProps(state) {
  return {
    auth: state.auth,
    categories: state.categories
  };
}
export default connect(mapStateToProps)(App);
