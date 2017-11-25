import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';

import styles from '../services/styles';

class ItemsList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.items.map(({ displayName, imageURL }) => (
            <ListItem
              key={displayName}
              dense
              button
              className={classes.listItem}
            >
              <Avatar alt={displayName} src={imageURL} />
              <ListItemText primary={displayName} />
              {/* <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(value)}
                      checked={this.state.checked.indexOf(value) !== -1}
                    />
                  </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const Items = props => (props.items ? <ItemsList {...props} /> : null);

Items.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(({ items }) => ({
  items,
}))(withStyles(styles)(Items));
