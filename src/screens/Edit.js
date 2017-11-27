import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import firebase from '../config/firebase';
import Actions from '../components/Actions';
import { getItemBaseName } from '../helpers';
import styles from '../services/styles';
import AvatarPicker from '../components/AvatarPicker';

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
        console.warn(err);
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

class EditForm extends Edit {
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
    e.preventDefault();

    this.fbRef.set({
      displayName: this.state.displayName.trim(),
      imageURL: this.state.imageURL.trim(),
    });
  };

  manualUpdate = updates => {
    this.fbRef.set({
      ...this.state,
      ...updates,
    });
    this.setState({ ...this.state, ...updates });
  };

  deleteItem = () => {
    this.fbRef.remove();
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

        <AvatarPicker
          imageURL={imageURL}
          altText={displayName}
          id="edit-item"
          basename={getItemBaseName(this.props.match.params.id)}
          handler={(err, { size, imageURL }) => {
            if (err) {
              console.warn('Upload error', err);
              return this.setState({
                error: err.toString(),
              });
            }

            const imageKey = size === 'thumb' ? 'imageURL' : 'imageFullURL';

            this.manualUpdate({
              [imageKey]: imageURL,
            });
          }}
        />

        <form
          onSubmit={this.updateItem}
          style={{ width: 'calc(100% - 20px)', maxWidth: 400 }}
        >
          <TextField
            label="Title"
            name="displayName"
            className={classes.textField}
            margin="normal"
            value={this.state.displayName}
            onChange={this.updateTextInput}
          />
          <Actions onDelete={this.deleteItem} onUpdate={this.updateItem} />
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Edit);
