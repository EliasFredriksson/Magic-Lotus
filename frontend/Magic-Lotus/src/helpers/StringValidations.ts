const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
const HAS_COUNTRY_DIGITS = /^\+[0-9]{2}/;
const HAS_UNIQUE_CHARACTER = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const HAS_ONLY_NUMBERS = /^\d+$/;
const HAS_NUMBER = /\d/;
const HAS_NUMBER_WITH_WHITESPACE = /[\d ]*/;
const NAME_REGEX = /^[A-Öa-ö-]*$/;
const NAME_ALLOW_WHITESPACE_REGEX = /^[A-Öa-ö- ]*$/;

// CHECK IF https (s is optional).
// CHECK IF HTTPS, IT IS FOLLOWED BY 2 "//".
// CHECK THAT "www." EXISTS.
// FOLLOWED BY LETTERS AND OR NUMBERS.
// FOLLOWED BY ONE "." DOT.
// FOLLOWED BY MINIMUM TWO lowercase LETTERS
// OPTIONALLY FOLLOWED BY ONE & AND ANY LETTER, NUMBER OR ALLOWED SYMBOLS.
const URL_REGEX =
  /^(https?:\/\/)?(www.)([a-z\d]([a-z\d-]*[a-z\d])*)+\.{1}([a-z]{2,})(&[a-zA-Z\d?"&=[\]]*)?$/;

const HAS_PROTOCOL = /^(http|https):\/\//;

export const isEmail = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return EMAIL_REGEX.test(text);
};

export const isPhone = (text: string): boolean => {
  if (isEmpty(text)) return false;
  // REMOVE ALL WHITESPACE AND "-" CHARACTERS
  const trimmed = text.replaceAll(/[- ]{1}/g, "");
  // CHECK IF START OF STRING HAS COUNTRY CODE
  const hasCountryCode = HAS_COUNTRY_DIGITS.test(trimmed);
  if (hasCountryCode) {
    // CHECK THAT ALL CHARACTERS IN STRING ARE DIGITS (Except first char which is a "+")
    if (!/\d/.test(trimmed.slice(1))) return false;
    // SPLIT STRING WHERE THE COUNTRY CODE IS
    const split = trimmed.split(/^\+\d{2}/);
    // IF WE MANAGED TO SPLIT, MEANS THAT WE HAVE A COUNTRY CODE, CHECK LENGTH OF
    // THE REMAINDER NUMBERS IS LONG ENOUGH / SHORT ENOUGH
    if (split.length === 2) return split[1].length >= 7 && split[1].length <= 9;
    else return false;
  } else {
    // CHECK THAT ALL CHARACTERS IN STRING ARE DIGITS
    if (!/\d/.test(trimmed)) return false;
    // CHECK LENGTH THAT NUMBER IS LONG ENOUGH / SHORT ENOUGH
    else return trimmed.length >= 8 && trimmed.length <= 10;
  }
};

export const isEmpty = (text: string): boolean => {
  if (text) return text.trim().length <= 0;
  return true;
};

export const hasUniqueCharacter = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return HAS_UNIQUE_CHARACTER.test(text);
};

export const hasOnlyNumbers = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return HAS_ONLY_NUMBERS.test(text);
};

export const hasNumber = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return HAS_NUMBER.test(text);
};

export const hasNumberWithWhitespace = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return HAS_NUMBER_WITH_WHITESPACE.test(text);
};

export const isName = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return NAME_REGEX.test(text);
};

export const isNameWithWhitespace = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return NAME_ALLOW_WHITESPACE_REGEX.test(text);
};

export const isDate = (text: string): boolean => {
  if (isEmpty(text)) return false;
  if (isNaN(Date.parse(text))) return false;
  return true;
};

export const isUrl = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return URL_REGEX.test(text);
};

export const hasProtocol = (text: string): boolean => {
  if (isEmpty(text)) return false;
  return HAS_PROTOCOL.test(text);
};

export const isLength = (
  text: string,
  condition: "LARGER" | "SMALLER" | "EQUAL",
  length: number
) => {
  switch (condition) {
    case "EQUAL":
      return text.length === length;
    case "LARGER":
      return text.length > length;
    case "SMALLER":
      return text.length < length;
    default:
      throw "ERROR, faulty condition provided for isLength helper inside 'StringValidations.ts'";
  }
};

export const capitalizeWord = (word: string): string => {
  if (word.length > 0) return word[0].toUpperCase() + word.substring(1);
  else return word;
};

export const capitalizeWordList = (words: string[]): string[] => {
  return words.map((word) => {
    if (word.length > 0) return word[0].toUpperCase() + word.substring(1);
    else return word;
  });
};
