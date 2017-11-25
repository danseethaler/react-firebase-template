import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import firebase from '../config/firebase';
import Actions from '../components/Actions';
import styles from '../services/styles';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: props.item.displayName || '',
      imageURL: props.item.imageURL || '',
    };
  }

  updateTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateItem = e => {
    e.preventDefault();
    this.props.fbRef.set({
      displayName: this.state.displayName,
      imageURL: this.state.imageURL,
    });
  };

  deleteItem = () => {
    this.props.fbRef.remove();
    this.props.history.push('/items');
  };

  render() {
    const { classes, item: { displayName } } = this.props;
    const { imageURL } = this.state;

    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          {displayName}
        </Typography>

        <Avatar alt={displayName} src={imageURL} />

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
        <EditForm {...this.props} item={this.state.item} fbRef={this.fbRef} />
      );
    }
    return null;
  }
}

export default withStyles(styles)(Edit);
