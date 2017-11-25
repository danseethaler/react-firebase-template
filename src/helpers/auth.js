import { ref, auth } from '../config/firebase'

export function authorize (email, pw) {
  return auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return auth().signOut()
}

export function login (email, pw) {
  return auth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return auth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
