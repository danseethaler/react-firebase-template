import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import List, {
  ListItem,
  // ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import { Link } from 'react-router-dom';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
// import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';

import styles from '../services/styles';

class ItemsList extends Component {
  getAvatar = ({ displayName, imageURL }) => {
    if (imageURL) {
      return <Avatar alt={displayName} src={imageURL} />;
    }
    return <Avatar>{displayName[0]}</Avatar>;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.props.items.map(({ id, displayName, imageURL }) => (
            <ListItem
              key={id}
              dense
              button
              className={classes.listItem}
              onClick={() => {
                this.props.history.push('/items/edit/' + id);
              }}
            >
              {this.getAvatar({ displayName, imageURL })}
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
        <Link to="/items/add">
          <Button
            fab
            color="primary"
            aria-label="add"
            style={{ position: 'fixed', bottom: 10, right: 10 }}
          >
            <AddIcon />
          </Button>
        </Link>
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
}))(withRouter(withStyles(styles)(Items)));
