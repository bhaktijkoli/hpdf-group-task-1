import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import muiThemeable from 'material-ui/styles/muiThemeable';

class Template extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="section home">

      </div>
    );
  }
}
export default withRouter(muiThemeable()(Template));
