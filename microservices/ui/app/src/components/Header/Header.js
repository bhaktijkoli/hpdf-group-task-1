import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import muiThemeable from 'material-ui/styles/muiThemeable';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        
      </header>
    );
  }
}
export default withRouter(muiThemeable()(Header));
