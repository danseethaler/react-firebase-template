export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_AUTH_STATUS':
      if (!action.user) {
        return {
          user: {
            authed: false,
          },
        };
      }

      return action.user;

    default:
      return state;
  }
};
