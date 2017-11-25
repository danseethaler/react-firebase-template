import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
  },
});

const Welcome = ({ history, classes }) => (
  <div className={classes.container}>
    <Button raised color="default" onClick={() => history.push('/login')}>
      Login
    </Button>
    <Button raised color="default" onClick={() => history.push('/register')}>
      Register
    </Button>
  </div>
);

export default withRouter(withStyles(styles)(Welcome));
