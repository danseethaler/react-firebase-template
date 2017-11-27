export const getItemBaseName = id => {
  return id.replace(/\W/g, '').toLowerCase();
};
