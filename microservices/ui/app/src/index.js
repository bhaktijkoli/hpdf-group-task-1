import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"
import store from "./store";

import './css/index.css';
import './css/bootstrap-grid.css';

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
