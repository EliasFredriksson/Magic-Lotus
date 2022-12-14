import { areKeysSame, areValuesSame } from "./ObjectValidations";

export const isObjectInList = (object: Object, list: Object[]): boolean => {
  return list.includes(object);
};

export const isObjectInListNonInclude = (
  object: Object,
  list: Object[]
): boolean => {
  if (list.length <= 0) return false;

  let included = false;
  for (const o of list) {
    if (!areKeysSame(object, o)) continue;
    if (!areValuesSame(object, o)) continue;
    included = true;
  }
  return included;
};

export const areListsEqualIgnoreOrder = (
  listOne: Array<any>,
  listTwo: Array<any>
): boolean => {
  if (listOne.length !== listTwo.length) return false;
  return listOne.every((element) => {
    if (listTwo.includes(element)) return true;
    return false;
  });
};

export const areListsEqual = (
  listOne: Array<any>,
  listTwo: Array<any>
): boolean => {
  if (listOne.length !== listTwo.length) return false;
  if (JSON.stringify(listOne.sort()) !== JSON.stringify(listTwo.sort()))
    return false;
  return true;
};

export const areListOneObjectsInListTwo = (
  listOne: Object[],
  listTwo: Object[]
) => {
  for (const obj of listOne) {
    if (!listTwo.includes(obj)) return false;
  }
  return true;
};
