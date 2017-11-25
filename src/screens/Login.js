import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/auth';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

function setErrorMsg(error) {
  return {
    loginMessage: error,
  };
}

class Login extends Component {
  state = { loginMessage: null, email: '', password: '' };

  handleSubmit = e => {
    e.preventDefault();
    login(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/items');
      })
      .catch(error => {
        this.setState(setErrorMsg('Invalid username/password.'));
      });
  };

  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() =>
        this.setState(
          setErrorMsg(`Password reset email sent to ${this.state.email}.`)
        )
      )
      .catch(error => this.setState(setErrorMsg(`Email address not found.`)));
  };

  getLoginMessage = () => {
    const { loginMessage } = this.state;

    if (!loginMessage) {
      return null;
    }

    const action = (
      <Button color="accent" dense onClick={this.resetPassword}>
        Forgot Password?
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
        message={<span id="message-id">{loginMessage}</span>}
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
          Login
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
              Login
            </Button>
          </div>
        </form>
        {this.getLoginMessage(this.state.loginMessage)}
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: 20,
  },
  textField: {
    width: '100%',
  },
});

export default withRouter(withStyles(styles)(Login));
