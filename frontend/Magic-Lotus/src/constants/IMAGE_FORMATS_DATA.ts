type Formats =
  | "png"
  | "border_crop"
  | "art_crop"
  | "large"
  | "normal"
  | "small";

type ImageFormats = "JPG" | "PNG";

type IImageFormats = {
  [Property in Formats]: {
    size: {
      width: number;
      height: number;
    };
    format: ImageFormats;
    description: string;
  };
};

const IMAGE_FORMATS_DATA: IImageFormats = {
  png: {
    size: {
      width: 745,
      height: 1040,
    },
    format: "PNG",
    description:
      "A transparent, rounded full card PNG. This is the best image to use for videos or other high-quality content.",
  },
  border_crop: {
    size: {
      width: 480,
      height: 680,
    },
    format: "JPG",
    description:
      "A full card image with the rounded corners and the majority of the border cropped off. Designed for dated contexts where rounded images can’t be used.",
  },
  art_crop: {
    size: {
      width: -1, // It varies
      height: -1, // It vaires
    },
    format: "JPG",
    description:
      "A rectangular crop of the card’s art only. Not guaranteed to be perfect for cards with outlier designs or strange frame arrangements",
  },
  large: {
    size: {
      width: 672,
      height: 936,
    },
    format: "JPG",
    description: "A large full card image",
  },
  normal: {
    size: {
      width: 488,
      height: 680,
    },
    format: "JPG",
    description: "A medium-sized full card image",
  },
  small: {
    size: {
      width: 146,
      height: 204,
    },
    format: "JPG",
    description:
      "A small full card image. Designed for use as thumbnail or list icon.",
  },
};

export default IMAGE_FORMATS_DATA;
