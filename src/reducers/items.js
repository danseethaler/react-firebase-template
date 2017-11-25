export default (state = [], action) => {
  let currentItems;
  let i;

  switch (action.type) {
    case 'NEW_ITEM':
      currentItems = state.slice();
      currentItems.push(action.item);
      return currentItems;

    case 'UPDATE_ITEM':
      currentItems = state.slice();
      i = currentItems.findIndex(item => item.id === action.item.id);
      if (i === -1) {
        return state;
      }

      currentItems[i] = action.item;
      return currentItems;

    case 'REMOVE_ITEM':
      currentItems = state.slice();
      i = currentItems.findIndex(item => item.id === action.id);

      if (i === -1) {
        return state;
      }

      currentItems.splice(i, 1);
      return currentItems;

    case 'CLEAR_ITEMS':
      return [];

    default:
      return state;
  }
};
