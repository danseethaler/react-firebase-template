import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import firebase from '../config/firebase';
import Actions from '../components/Actions';
import styles from '../services/styles';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        displayName: '',
        imageURL: '',
      },
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
          item: { ...this.state.item, ...snapshot.val() },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.fbRef.off();
  }

  updateItem = e => {
    e.preventDefault();
    this.fbRef.set(this.state.item);
  };

  updateTextInput = e => {
    this.setState({
      item: {
        ...this.state.item,
        [e.target.name]: e.target.value,
      },
    });
  };

  deleteItem = () => {
    this.fbRef.remove();
    this.props.history.push('/items');
  };

  render() {
    const { classes } = this.props;
    const { item } = this.state;
    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          {item.displayName}
        </Typography>
        <form onSubmit={this.updateItem}>
          <div>
            <TextField
              label="Title"
              name="displayName"
              className={classes.textField}
              margin="normal"
              value={this.state.item.displayName}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Description"
              name="description"
              className={classes.textField}
              margin="normal"
              value={this.state.item.description}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Image URL"
              name="imageURL"
              className={classes.textField}
              margin="normal"
              value={this.state.item.imageURL}
              onChange={this.updateTextInput}
            />
            <Actions onDelete={this.deleteItem} onUpdate={this.updateItem} />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Edit);
