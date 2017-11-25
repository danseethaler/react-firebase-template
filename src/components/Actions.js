import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Delete from 'material-ui-icons/Delete';

class Actions extends Component {
  constructor() {
    super();
    this.state = { deleteConfirm: false };
  }
  render() {
    const { classes } = this.props;
    const { deleteConfirm } = this.state;

    const deleteStart = [
      <Button
        key="delete"
        className={classes.button}
        raised
        color="accent"
        onClick={() => this.setState({ deleteConfirm: true })}
      >
        Delete
        <Delete className={classes.rightIcon} />
      </Button>,
      <Button
        key="update"
        type="submit"
        raised
        color="primary"
        className={classes.button}
      >
        Update
      </Button>,
    ];

    const deleteConfirmButtons = [
      <Button
        key="delete"
        className={classes.button}
        raised
        color="accent"
        onClick={this.props.onDelete}
      >
        Confirm Delete
        <Delete className={classes.rightIcon} />
      </Button>,
      <Button
        key="update"
        type="submit"
        raised
        color="default"
        className={classes.button}
        onClick={() => this.setState({ deleteConfirm: false })}
      >
        Cancel
      </Button>,
    ];

    return (
      <div className={classes.buttonContainer}>
        {deleteConfirm ? deleteConfirmButtons : deleteStart}
      </div>
    );
  }
}
const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(Actions);
