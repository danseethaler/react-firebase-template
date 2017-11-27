import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import Slide from 'material-ui/transitions/Slide';
import { connect } from 'react-redux';

import AvatarPicker from '../components/AvatarPicker';
import { auth } from '../config/firebase';
import { getItemBaseName } from '../helpers';
import styles from '../services/styles';
import SnackWrap from '../components/SnackWrap';

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
      snackMsg: msg,
    });

    setTimeout(() => {
      this.setState({
        snackMsg: false,
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

  manualUpdate = updates => {
    auth()
      .currentUser.updateProfile(updates)
      .then(() => {
        this.saved('Image updated.');
      })
      .catch(error => {
        console.warn(error);
        this.saved('Error occured while updating image!');
      });
    this.setState({ ...this.state, ...updates });
  };

  render() {
    const { user: { displayName, photoURL, uid }, classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography type="display1" gutterBottom>
          {displayName}
        </Typography>
        <AvatarPicker
          imageURL={photoURL}
          altText={displayName}
          id="account-edit"
          basename={getItemBaseName(uid)}
          handler={(err, { size, imageURL }) => {
            if (err) {
              console.warn('Upload error', err);
              return this.setState({
                error: err.toString(),
              });
            }

            if (size === 'thumb') {
              this.manualUpdate({
                photoURL: imageURL,
              });
            }
          }}
        />
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
        <SnackWrap msg={this.state.snackMsg} />
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
