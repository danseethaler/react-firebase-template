import { Component } from 'react';
import { connect } from 'react-redux';

import firebase, { auth } from '../config/firebase';
import { onAuthStateChanged } from '../actions/user';
import { addNewItem } from '../actions/items';

class UserTracker extends Component {
  componentDidMount() {
    const { onAuthStateChanged } = this.props;
    this.removeListener = auth().onAuthStateChanged(onAuthStateChanged);

    // fetch('https://randomuser.me/api/')
    //   .then(data => data.json())
    //   .then(data => {
    //     const user = data.results.shift();
    //     // console.log('user', user);

    //     firebase
    //       .database()
    //       .ref('items')
    //       .push({
    //         displayName: user.name.first + ' ' + user.name.last,
    //         imageURL: user.picture.medium,
    //       });
    //   });

    this.itemsRef = firebase
      .database()
      .ref('items')
      .orderByKey();

    this.itemsRef.on('child_added', this.addItem);
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
}

const mapDispatchToProps = dispatch => ({
  onAuthStateChanged: status => {
    dispatch(onAuthStateChanged(status));
  },
  addNewItem: itemDetail => {
    dispatch(addNewItem(itemDetail));
  },
});

export default connect(({ user }) => user, mapDispatchToProps)(UserTracker);
