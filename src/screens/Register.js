import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

import { authorize } from '../helpers/auth';
import styles from '../services/styles';

function setErrorMsg(error) {
  return {
    registerError: error.message,
  };
}

class Register extends Component {
  state = { registerError: null, email: '', password: '' };

  handleSubmit = e => {
    e.preventDefault();
    authorize(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/items');
      })
      .catch(e => this.setState(setErrorMsg(e)));
  };

  getRegisterError = () => {
    const { registerError } = this.state;

    if (!registerError) {
      return null;
    }

    const action = (
      <Button
        color="accent"
        dense
        onClick={() => {
          this.props.history.push('/login');
        }}
      >
        Login?
      </Button>
    );

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={true}
        autoHideDuration={3000}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{registerError}</span>}
        action={action}
      />
    );
  };

  updateTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              label="Email"
              name="email"
              className={classes.textField}
              margin="normal"
              value={this.state.email}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              className={classes.textField}
              margin="normal"
              value={this.state.password}
              onChange={this.updateTextInput}
            />
            <Button
              key="update"
              type="submit"
              raised
              color="primary"
              className={classes.button}
              onClick={this.save}
            >
              Register
            </Button>
          </div>
        </form>
        {this.getRegisterError(this.state.registerError)}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Register));
