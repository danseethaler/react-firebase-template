import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

function SimpleList({ classes, actions, history }) {
  const actionItem = ({ type, ...rest }, i) => {
    if (type === 'divider') {
      return <Divider key={`divider_${i}`} />;
    }
    if (type === 'item') {
      const { to, Icon, text } = rest;
      return (
        <ListItem key={to} button onClick={() => history.push(to)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    }
  };

  return (
    <div className={classes.root}>
      <List>{actions.map(actionItem)}</List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleList));
