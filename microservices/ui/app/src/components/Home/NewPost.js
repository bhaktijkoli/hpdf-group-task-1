import React, { Component } from 'react';

import {Paper} from 'material-ui';
import {TextField, RaisedButton, IconButton} from 'material-ui';

import IconPhoto from 'material-ui/svg-icons/editor/insert-photo';
import IconVideo from 'material-ui/svg-icons/av/videocam';
import IconGif from 'material-ui/svg-icons/action/gif';
import IconPoll from 'material-ui/svg-icons/social/poll';
import IconLocation from 'material-ui/svg-icons/communication/location-on';

import $ from 'jquery';
import route from './../../utils/route';
import request from './../../utils/request';

const buttonStyle = {
  margin: 12,
};

class NewPost extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    var data = $(e.target).serialize();
    console.log(data);
    request.makePost(route('/submitpost'), data)
    .then((response)=>{
      // window.location = "/";
    })
  }
  render() {
    return (
      <div className="row">
        <Paper className="new-post-container">
          <form onSubmit={e=>this.handleSubmit(e)}>
          <input type="hidden" name="hasura_id" value={this.props.auth.user.hasura_id}/>
            <input type="hidden" name="email" value={this.props.auth.user.username}/>
          <TextField floatingLabelText="What's happening ?" id="newpost" name="newpost" rows={1} fullWidth={true} multiLine={true} name="text"/>
          <div className="new-post-action">
            <IconButton><IconPhoto /></IconButton>
            <IconButton><IconVideo /></IconButton>
            <IconButton><IconGif /></IconButton>
            <IconButton><IconPoll /></IconButton>
            <IconButton><IconLocation /></IconButton>
            <RaisedButton type="submit" className="pull-right" label="Post" primary={true} style={buttonStyle} />
          </div>
        </form>
        </Paper>

      </div>
    );
  }
}

export default NewPost;
