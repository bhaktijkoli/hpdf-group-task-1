import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"

import muiThemeable from 'material-ui/styles/muiThemeable';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    document.title = "Facebook";
  }
  render() {
    return (
      <div className="section home">
        <h1>Welcome {this.props.auth.user.firstname}</h1>
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
