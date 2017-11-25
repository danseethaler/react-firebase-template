import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom';

import firebase from '../config/firebase';
import styles from '../services/styles';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: '', items: [] };
  }

  addRecipe = e => {
    e.preventDefault();

    const { displayName } = this.state;

    if (!displayName.trim()) return;

    firebase
      .database()
      .ref('items')
      .push({
        displayName: this.state.displayName.trim(),
      })
      .then(res => {
        this.props.history.push('/items/edit/' + res.key);
      });
  };

  updateTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.addRecipe}>
        <div className={classes.container}>
          <TextField
            label="Display Name"
            id="margin-normal"
            className={classes.textField}
            margin="normal"
            name="displayName"
            // helperText="Display Name"
            value={this.state.displayName}
            onChange={this.updateTextInput}
          />
          <div style={{ width: '100%' }}>
            <Button
              type="submit"
              raised
              color="accent"
              style={{ float: 'right' }}
            >
              Add Item
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(withStyles(styles)(Add));
