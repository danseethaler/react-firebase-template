import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import { withRouter } from 'react-router-dom';

import DrawerItems from './DrawerItems';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ButtonAppBar extends Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  getButton = authed => {
    const { history } = this.props;
    if (authed) {
      return (
        <Button
          color="contrast"
          onClick={() => {
            history.push('/logout');
          }}
        >
          Logout
        </Button>
      );
    }
    return (
      <Button
        color="contrast"
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>
    );
  };

  render() {
    const { classes, title, actions, authed } = this.props;
    console.log('actions', actions);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Drawer
              open={this.state.drawerOpen}
              onRequestClose={this.toggleDrawer}
              className={classes.drawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
              >
                <DrawerItems actions={actions} />
              </div>
            </Drawer>
            <IconButton
              className={classes.menuButton}
              color="default"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            {this.getButton(authed)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(withStyles(styles)(ButtonAppBar));
