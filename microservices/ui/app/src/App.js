import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux"

import {getAuthUser} from './actions/authActions'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  constructor(props) {
    super(props);
    getAuthUser(this.props);
  }
  render() {
    if(this.props.auth.loading == true) {
      return(
        <center style={{marginTop:'30%'}}>
          <CircularProgress size={60} thickness={7} />
        </center>
      )
    }
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Route exact path="/" component={this.props.auth.check?Home:Login}/>
        </div>
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
