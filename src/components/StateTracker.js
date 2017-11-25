import { Component } from 'react';
import { connect } from 'react-redux';

import firebase, { auth } from '../config/firebase';
import { onAuthStateChanged } from '../actions/user';
import {
  addNewItem,
  clearItems,
  updateItem,
  removeItem,
} from '../actions/items';

function addSeedData() {
  fetch('https://randomuser.me/api/')
    .then(data => data.json())
    .then(data => {
      const user = data.results.shift();

      firebase
        .database()
        .ref('items')
        .push({
          displayName: user.name.first + ' ' + user.name.last,
          imageURL: user.picture.large,
        });
    });
}

class StateTracker extends Component {
  componentDidMount() {
    const { onAuthStateChanged } = this.props;
    this.removeListener = auth().onAuthStateChanged(status => {
      if (!status) {
        // User is logged out
        this.itemsRef.off();
        this.props.clearItems();
      } else {
        // User is logged in
        this.itemsRef.on('child_added', this.addItem);
        addSeedData();
        this.itemsRef.on('child_changed', this.updateItem);

        this.itemsRef.on('child_removed', data => {
          this.props.removeItem(data.key);
        });
      }
      onAuthStateChanged(status);
    });

    this.itemsRef = firebase
      .database()
      .ref('items')
      .orderByKey();
  }
  componentWillUnmount() {
    this.removeListener();
    this.itemsRef.off();
  }

  addItem = snap => {
    this.props.addNewItem({
      ...snap.val(),
      ...{ id: snap.key },
    });
  };

  render() {
    return null;
  }

  updateItem = data => {
    this.props.updateItem({ id: data.key, ...data.val() });
  };
}

const mapDispatchToProps = dispatch => ({
  onAuthStateChanged: status => {
    dispatch(onAuthStateChanged(status));
  },
  addNewItem: itemDetail => {
    dispatch(addNewItem(itemDetail));
  },
  updateItem: itemDetail => {
    dispatch(updateItem(itemDetail));
  },
  removeItem: key => {
    dispatch(removeItem(key));
  },
  clearItems: () => {
    dispatch(clearItems());
  },
});

export default connect(({ user }) => user, mapDispatchToProps)(StateTracker);
