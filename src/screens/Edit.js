import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import firebase from '../config/firebase';
import Actions from '../components/Actions';
import styles from '../services/styles';
import Avatar from '../components/Avatar';
import { storageRef } from '../config/firebase';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: props.item.displayName || '',
      imageURL: props.item.imageURL || '',
      error: null,
    };
  }

  updateTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateItem = e => {
    this.props.fbRef.set({
      displayName: this.state.displayName,
      imageURL: this.state.imageURL,
    });
  };

  manualUpdate = updates => {
    this.props.fbRef.set(updates);
    this.setState({ ...this.state, ...updates });
  };

  deleteItem = () => {
    this.props.fbRef.remove();
    this.props.history.push('/items');
  };

  validFile = file => {
    const extIndex = file.name.lastIndexOf('.') + 1;

    if (!extIndex) {
      return false;
    }

    var ext = file.name.substr(extIndex).toLowerCase();
    return ['png', 'jpeg', 'jpg'].includes(ext);
  };

  getUserIconName = ({ name }) => {
    const fileName = `${this.props.id}_${name.trim().toLowerCase()}`;
    return fileName;
  };

  handleFiles = e => {
    const { files } = e.target;
    const file = files[0];

    if (!this.validFile(file)) {
      return this.setState({
        error: 'Invalid file type.',
      });
    }

    const fileName = this.getUserIconName(file);
    var imagesRef = storageRef.child(`images/${fileName}`);

    imagesRef
      .put(file)
      .then(({ downloadURL: imageURL }) => {
        this.manualUpdate({
          imageURL,
        });
      })
      .catch(err => {
        this.setState({
          error: 'Invalid file type.',
        });
      });
  };

  render() {
    const { classes, item: { displayName } } = this.props;
    const { imageURL } = this.state;

    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          {displayName}
        </Typography>

        <Avatar text={displayName} imageURL={imageURL} big />

        <input type="file" id="input" onChange={this.handleFiles} />

        <form onSubmit={this.updateItem}>
          <div>
            <TextField
              label="Title"
              name="displayName"
              className={classes.textField}
              margin="normal"
              value={this.state.displayName}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Image URL"
              name="imageURL"
              className={classes.textField}
              margin="normal"
              value={this.state.imageURL}
              onChange={this.updateTextInput}
            />
            <Actions onDelete={this.deleteItem} onUpdate={this.updateItem} />
          </div>
        </form>
      </div>
    );
  }
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: false,
    };
  }

  componentDidMount() {
    this.fbRef = firebase
      .database()
      .ref('items')
      .child(this.props.match.params.id);

    this.fbRef
      .once('value')
      .then(snapshot => {
        this.setState({
          item: { ...snapshot.val() },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.fbRef.off();
  }

  render() {
    if (this.state.item) {
      return (
        <EditForm
          {...this.props}
          id={this.props.match.params.id}
          item={this.state.item}
          fbRef={this.fbRef}
        />
      );
    }
    return null;
  }
}

export default withStyles(styles)(Edit);
