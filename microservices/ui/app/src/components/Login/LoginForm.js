import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {TextField, RaisedButton } from 'material-ui';

import $ from 'jquery';

import route from './../../utils/route';
import request from './../../utils/request';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      emailError:'',
      passwordError:'',
    }
  }
  handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({[name]:value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({emailError:'', passwordError: ''})
    var data = $(e.target).serialize();
    request.makePost(route('/loginpoint'), data)
    .then((response)=>{
      window.location = "/";
    })
    .catch(()=>{
      this.setState({emailError:' ', passwordError: 'Your email or password is invalid.'})
    })
  }
  render() {
    return (
      <form onSubmit={e=>this.handleSubmit(e)}>
        <TextField floatingLabelText="Email" type="email" fullWidth name="email" errorText={this.state.emailError} value={this.state.email} onChange={e => this.handleChange(e)}/>
        <TextField floatingLabelText="Password" type="password" fullWidth name="password" errorText={this.state.passwordError} value={this.state.password} onChange={e => this.handleChange(e)}/>
        <div className="space"></div>
        <RaisedButton type="submit" label="Login" primary={true} fullWidth/>
        <div className="space-50"></div>
      </form>
    );
  }
}
export default withRouter(LoginForm);
