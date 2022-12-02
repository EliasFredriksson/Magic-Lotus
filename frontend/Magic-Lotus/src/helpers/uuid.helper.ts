import * as uuid from "uuid";

export const isValidUUID = (text: string) => {
  return uuid.validate(text);
};
