import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
// import Slide from 'material-ui/transitions/Slide';
import { connect } from 'react-redux';

import { auth } from '../config/firebase';
import styles from '../services/styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: props.user.displayName || '',
      email: props.user.email || '',
      photoURL: props.user.photoURL || '',
    };
  }

  updateTextInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saved = msg => {
    this.setState({
      saved: msg,
    });

    setTimeout(() => {
      this.setState({
        saved: false,
      });
    }, 3000);
  };

  save = e => {
    e.preventDefault();

    auth()
      .currentUser.updateProfile({
        displayName: this.state.displayName,
        photoURL: this.state.photoURL,
      })
      .then(() => {
        this.saved('Saved.');
      })
      .catch(error => {
        this.saved('Error occured while saving!');
      });
  };

  getSnackBar = msg => {
    if (!msg) {
      return null;
    }

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
        message={<span id="message-id">{msg}</span>}
      />
    );
  };

  render() {
    const { user: { displayName }, classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          {displayName}
        </Typography>
        <form onSubmit={this.save}>
          <div>
            <TextField
              label="Display Name"
              name="displayName"
              className={classes.textField}
              margin="normal"
              value={this.state.displayName}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Email Address"
              name="email"
              className={classes.textField}
              margin="normal"
              value={this.state.email}
              onChange={this.updateTextInput}
            />
            <TextField
              label="Photo URL"
              name="photoURL"
              className={classes.textField}
              margin="normal"
              value={this.state.photoURL}
              onChange={this.updateTextInput}
            />
            <Button
              key="update"
              type="submit"
              raised
              color="primary"
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </form>
        {this.getSnackBar(this.state.saved)}
      </div>
    );
  }
}

class Account extends Component {
  render() {
    if (this.props.user.email) {
      return <AccountForm {...this.props} />;
    }
    return null;
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(id);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Account)
);
