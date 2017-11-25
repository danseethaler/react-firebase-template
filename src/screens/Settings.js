import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import styles from '../services/styles';

class Settings extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.container}>Settings</div>;
  }
}

export default withStyles(styles)(Settings);
