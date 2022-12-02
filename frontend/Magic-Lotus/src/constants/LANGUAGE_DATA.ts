// ================= LANGUAGE CODE =================
// LIST
const LANGUAGE_CODES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ja",
  "ko",
  "ru",
  "zhs",
  "zht",
  "he",
  "la",
  "grc",
  "ar",
  "sa",
  "ph",
] as const;
// GENERATE A TYPE FROM LIST OF LANGUAGES TO ONLY ALLOW STRINGS
// THAT EXISTS IN THE "LANGUAGE_CODES" LIST.
export type ILanguageCode = typeof LANGUAGE_CODES[number];
// =================================================

// ================= PRINTED LANGUAGES CODE =================
// LIST
const PRINTED_LANG_CODE = [
  "en",
  "sp",
  "fr",
  "de",
  "it",
  "pt",
  "jp",
  "kr",
  "ru",
  "cs",
  "ct",
  "ph",
] as const;
// TYPE
export type ILanguagePrintedCode = typeof PRINTED_LANG_CODE[number];
// ==========================================================

// ================= LANGUAGE FULL NAMES =================
// LIST
const LANGUAGE_FULL_NAMES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Korean",
  "Russian",
  "Simplified Chinese",
  "Traditional Chinese",
  "Hebrew",
  "Latin",
  "Ancient Greek",
  "Arabic",
  "Sanskrit",
  "Phyrexian",
] as const;
// TYPE
export type ILanguageFullName = typeof LANGUAGE_FULL_NAMES[number];
// =======================================================

// ================= LANGUAGE DATA =================
export type ILanguage = {
  [Property in ILanguageCode]: {
    printedCode: ILanguagePrintedCode | null;
    name: ILanguageFullName;
    cardAmount: number;
  };
};
const LANGUAGE_DATA: ILanguage[] = [
  {
    en: {
      printedCode: "en",
      name: "English",
      cardAmount: 75004,
    },
    es: {
      printedCode: "sp",
      name: "Spanish",
      cardAmount: 36557,
    },
    fr: {
      printedCode: "fr",
      name: "French",
      cardAmount: 38396,
    },
    de: {
      printedCode: "de",
      name: "German",
      cardAmount: 37750,
    },
    it: {
      printedCode: "it",
      name: "Italian",
      cardAmount: 36973,
    },
    pt: {
      printedCode: "pt",
      name: "Portuguese",
      cardAmount: 32969,
    },
    ja: {
      printedCode: "jp",
      name: "Japanese",
      cardAmount: 40442,
    },
    ko: {
      printedCode: "kr",
      name: "Korean",
      cardAmount: 15336,
    },
    ru: {
      printedCode: "ru",
      name: "Russian",
      cardAmount: 21558,
    },
    zhs: {
      printedCode: "cs",
      name: "Simplified Chinese",
      cardAmount: 32061,
    },
    zht: {
      printedCode: "ct",
      name: "Traditional Chinese",
      cardAmount: 23449,
    },
    he: {
      printedCode: null,
      name: "Hebrew",
      cardAmount: 1,
    },
    la: {
      printedCode: null,
      name: "Latin",
      cardAmount: 1,
    },
    grc: {
      printedCode: null,
      name: "Ancient Greek",
      cardAmount: 1,
    },
    ar: {
      printedCode: null,
      name: "Arabic",
      cardAmount: 1,
    },
    sa: {
      printedCode: null,
      name: "Sanskrit",
      cardAmount: 1,
    },
    ph: {
      printedCode: "ph",
      name: "Phyrexian",
      cardAmount: 18,
    },
  },
];

export default LANGUAGE_DATA;
// =================================================
