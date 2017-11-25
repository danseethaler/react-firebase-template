export const addNewItem = item => {
  return {
    type: 'NEW_ITEM',
    item,
  };
};

export const updateItem = item => {
  return {
    type: 'UPDATE_ITEM',
    item,
  };
};

export const removeItem = id => {
  return {
    type: 'REMOVE_ITEM',
    id,
  };
};

export const clearItems = () => {
  return {
    type: 'CLEAR_ITEMS',
  };
};
