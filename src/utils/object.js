const getFirstObjectKey = (object) => {
  return Object.keys(object)[0];
};

const getFirstObjectPair = (object) => {
  return Object.entries(object)[0];
};

export { getFirstObjectKey, getFirstObjectPair };
