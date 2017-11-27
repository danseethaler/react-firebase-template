import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class SnackWrap extends Component {
  render() {
    const { msg, action, actionText } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!msg}
        autoHideDuration={3000}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{msg}</span>}
      />
    );
  }
}

export default SnackWrap;
