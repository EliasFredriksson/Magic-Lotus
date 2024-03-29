// ALL PATHS TO ALL STATIC RESOURCES IN THE PUBLIC FOLDER
export const PUBLIC_FOLDER = {
  FONTS: {
    NUNITO: "/fonts/Nunito-Regular.ttf",
    MONTSERRAT: "/fonts/Montserrat-Regular.ttf",
  },
  IMAGES: {
    USERS: {
      DEFAULT: "/images/Default_profile_image.svg",
    },
    CARD: {
      BACKSIDE: "/images/Magic_card_back.webp",
      BACKSIDE_WITH_ERROR: "/images/Magic_card_back_ERROR_MSG.webp",
    },
  },
} as const;
