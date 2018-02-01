import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

      </div>
    );
  }
}
export default withRouter(muiThemeable()(Home));
