import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { auth } from '../config/firebase';
import { logoutUser } from '../actions/user';

class Logout extends Component {
  componentDidMount() {
    auth()
      .signOut()
      .then(
        () => {
          this.props.logout();
          this.props.history.push('/');
        },
        error => {
          console.log('error signing out', error);
        }
      );
  }
  render() {
    return <div>Goodbye.</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
