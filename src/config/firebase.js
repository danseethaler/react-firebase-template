import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD9YIeGxGpYap-0burLaKmqMk-sxrRVFJU',
  authDomain: 'react-firebase-template.firebaseapp.com',
  databaseURL: 'https://react-firebase-template.firebaseio.com',
  projectId: 'react-firebase-template',
  storageBucket: '',
  messagingSenderId: '201304558867',
};

firebase.initializeApp(config);

export default firebase;
export const ref = firebase.database().ref();
export const auth = firebase.auth;
