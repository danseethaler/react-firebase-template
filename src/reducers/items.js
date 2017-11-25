export default (state = [], action) => {
  switch (action.type) {
    case 'NEW_ITEM':
      const currentItems = state.slice();
      currentItems.push(action.item);
      return currentItems;

    case 'CLEAR_ITEMS':
      return [];

    default:
      return state;
  }
};
