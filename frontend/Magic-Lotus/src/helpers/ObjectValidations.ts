// WILL BE REMOVED IN THE FUTURE (Named it poorly)
export const hasSameContent = (objOne: Object, objTwo: Object): boolean => {
  return JSON.stringify(objOne) === JSON.stringify(objTwo);
};

export const areObjectsEqual = (objOne: Object, objTwo: Object): boolean => {
  return JSON.stringify(objOne) === JSON.stringify(objTwo);
};

export const isIData = (object: Object) => {
  const keys = Object.keys(object).sort();
  const values = Object.values(object).sort();
  // SHOULD ONLY CONTAIN 2 ENTRIES
  if (keys.length !== 2) return false;
  // CHECK KEY NAMES
  if (keys[0] !== "id") return false;
  if (keys[1] !== "name") return false;
  // CHECK VALUE TYPES
  if (typeof values[0] !== "number") return false;
  if (typeof values[1] !== "string") return false;
  return true;
};

export const areKeysSame = (objOne: Object, objTwo: Object): boolean => {
  const oneKeys = Object.keys(objOne).sort();
  const twoKeys = Object.keys(objTwo).sort();
  return JSON.stringify(oneKeys) === JSON.stringify(twoKeys);
};
export const areValuesSame = (objOne: Object, objTwo: Object): boolean => {
  const oneValues = Object.values(objOne).sort();
  const twoValues = Object.values(objTwo).sort();
  return JSON.stringify(oneValues) === JSON.stringify(twoValues);
};
