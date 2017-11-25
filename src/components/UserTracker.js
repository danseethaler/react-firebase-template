import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from '../config/firebase';
import { onAuthStateChanged } from '../actions/user';

class UserTracker extends Component {
  componentDidMount() {
    const { onAuthStateChanged } = this.props;
    this.removeListener = auth().onAuthStateChanged(onAuthStateChanged);
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { onAuthStateChanged, authed } = this.props;

    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  onAuthStateChanged: status => {
    dispatch(onAuthStateChanged(status));
  },
});

export default connect(({ user }) => user, mapDispatchToProps)(UserTracker);
