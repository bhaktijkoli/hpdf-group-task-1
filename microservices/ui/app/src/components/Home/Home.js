import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"

import muiThemeable from 'material-ui/styles/muiThemeable';

import NewPost from './NewPost'

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    document.title = "Facebook";
  }
  render() {
    return (
      <div id="content-wrapper" className="section home">
        <div className="container">
          <NewPost auth={this.props.auth}/>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    categories: state.categories
  };
}
export default connect(mapStateToProps)(muiThemeable()(Home));
