export const onAuthStateChanged = user => {
  return {
    type: 'UPDATE_AUTH_STATUS',
    user,
  };
};

export const logoutUser = () => {
  return {
    type: 'UPDATE_AUTH_STATUS',
    authed: false,
  };
};
