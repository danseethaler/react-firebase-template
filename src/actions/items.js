export const addNewItem = item => {
  return {
    type: 'NEW_ITEM',
    item,
  };
};

export const clearItems = () => {
  return {
    type: 'CLEAR_ITEMS',
  };
};
