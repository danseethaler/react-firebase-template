import firebase from '../config/firebase';

export function addSeedData() {
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
